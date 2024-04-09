import asyncio
import json
from annotated_types import Len
import structlog
from typing import Optional
from openai.types.chat import ChatCompletionMessageParam
from pydantic import BaseModel, Field, validator
from typing_extensions import Annotated, AsyncGenerator, Iterable, Unpack
from ariadne import ObjectType, SubscriptionType
from graphql import GraphQLResolveInfo
from vespa.application import Vespa
from vespa.io import VespaQueryResponse
from openai import AsyncOpenAI

from .data import questions as data_questions, shot_user, shot_assistant
from .cache import cache_questions, cache_generate_summary
from .settings import VESPA_APP_URL, OPENAI_API_KEY
from .generated.schema_types import (
    Answer,
    AnswersParams,
    AnswersQueryResult,
    GenerateSummaryParams,
    GenerateSummarySubscriptionResult,
    Question,
    QuestionsParams,
    QuestionsQueryResult,
)


clientVespa = Vespa(url=VESPA_APP_URL)
clientOpenAI = AsyncOpenAI(
    api_key=str(OPENAI_API_KEY),
)
logger = structlog.get_logger("qa")
query = ObjectType("Query")


class QaFieldModel(BaseModel):
    sddocname: str
    documentid: str
    doc_id: str
    category_major: Optional[str] = None
    category_medium: Optional[str] = None
    category_minor: Optional[str] = None
    question: str
    answer: str


class QaModel(BaseModel):
    id: str
    relevance: float
    source: str
    fields: QaFieldModel


class AnswersParamsModel(BaseModel):
    query: Optional[str] = Field(strict=True, max_length=1024)


@query.field("answers")
async def resolve_answer(
    _, info: GraphQLResolveInfo, **params: Unpack[AnswersParams]
) -> AnswersQueryResult:
    assert info is not None, "Prevent type check error"

    params_parsed = AnswersParamsModel.model_validate(params, strict=True)
    answers: list[Answer] = []

    query = params_parsed.query
    if not query:
        logger.warning("Query is empty", params=params_parsed)
        return {"answers": answers}
    query_parsed = (
        query.replace("\\", "\\\\")
        .replace('"', '\\"')
        .replace(":", "\\:")
        .replace(")", "\\)")
    )

    base = "select * from qa where"
    anno = "{targetHits:100,approximate:false}"
    cond01 = f"({anno}nearestNeighbor(answer_embedding_me5s, q))"
    cond02 = f"({anno}nearestNeighbor(question_embedding_me5s, q))"

    async with clientVespa.asyncio() as sess:
        res: VespaQueryResponse = await sess.query(
            yql=f"{base} {cond01} or {cond02}",
            lang="ja",
            hits=20,
            ranking="semantic",
            body={
                "input.query(q)": f'embed(multilingual-e5-small, "query: {query_parsed}")',
            },
        )
        if not res.is_successful():
            logger.warning("Vespa query failed", json=res.json, status=res.status_code)
            return {"answers": answers}

        hits = [QaModel.model_validate(hit, strict=True) for hit in res.hits]
        answers = [
            Answer(
                id=hit.fields.doc_id,
                docId=hit.fields.doc_id,
                categoryMajor=hit.fields.category_major,
                categoryMedium=hit.fields.category_medium,
                categoryMinor=hit.fields.category_minor,
                question=hit.fields.question,
                answer=hit.fields.answer,
                score=hit.relevance,
            )
            for hit in hits
        ]

    return {"answers": answers}


class QuestionsParamsModel(BaseModel):
    query: Optional[str] = Field(strict=True, max_length=1024)


@query.field("questions")
async def resolve_question(
    _, info: GraphQLResolveInfo, **params: Unpack[QuestionsParams]
) -> QuestionsQueryResult:
    assert info is not None, "Prevent type check error"

    params_parsed = QuestionsParamsModel.model_validate(params, strict=True)
    questions: list[Question] = data_questions

    query = params_parsed.query
    if query is None:
        logger.warning("Query is empty", params=params_parsed)
        return {"questions": questions}
    query_parsed = (
        query.replace("\\", "\\\\")
        .replace('"', '\\"')
        .replace(":", "\\:")
        .replace(")", "\\)")
    )

    cached_questions = await cache_questions.get(query)
    if isinstance(cached_questions, list):
        return {"questions": cached_questions}

    base = "select * from qa where"
    anno = "{targetHits:100,approximate:false}"
    cond01 = "({targetHits:100}userInput(@condQuery))"
    cond02 = f'(question matches "{query_parsed}")'
    cond03 = f"({anno}nearestNeighbor(question_embedding_me5s, q))"

    async with clientVespa.asyncio() as sess:
        res: VespaQueryResponse = await sess.query(
            yql=f"{base} {cond01} or {cond02} or {cond03}",
            lang="ja",
            hits=20,
            ranking="question_semantic",
            body={
                "condQuery": query,
                "input.query(q)": f'embed(multilingual-e5-small, "query: {query_parsed}")',
            },
        )
        if not res.is_successful():
            logger.warning("Vespa query failed", json=res.json, status=res.status_code)
            return {"questions": questions}

        hits = [QaModel.model_validate(hit, strict=True) for hit in res.hits]
        questions = [
            Question(
                id=hit.fields.doc_id,
                docId=hit.fields.doc_id,
                categoryMajor=hit.fields.category_major,
                categoryMedium=hit.fields.category_medium,
                categoryMinor=hit.fields.category_minor,
                question=hit.fields.question,
            )
            for hit in hits
        ]

    await cache_questions.set(query, questions)
    return {"questions": questions}


subscription = SubscriptionType()


class GenerateSummaryParamsModel(BaseModel):
    query: str = Field(strict=True, max_length=1024)
    docIds: Annotated[list[str], Len(max_length=10)]

    @validator("docIds", each_item=True)
    def check_max_length(cls, v):
        if len(v) > 1024:
            raise ValueError("string length exceeds maximum of 1024")
        return v


@subscription.source("generateSummary")
async def generate_generate_summary(
    _, info: GraphQLResolveInfo, **params: Unpack[GenerateSummaryParams]
) -> AsyncGenerator[str, str]:
    assert info is not None, "Prevent type check error"

    params_parsed = GenerateSummaryParamsModel.model_validate(params, strict=True)
    if not params_parsed.query:
        logger.warning("No query found", params=params_parsed)
        return

    doc_ids = params_parsed.docIds or []
    if not doc_ids:
        logger.warning("No docIds found", params=params_parsed)
        return

    key = params_parsed.query + "|" + "|".join(sorted(doc_ids))
    cached_summary = await cache_generate_summary.get(key)
    if isinstance(cached_summary, str):
        for char in cached_summary:
            yield char
            await asyncio.sleep(0.05)
        return

    query_in = ", ".join(
        ['"' + x.replace("\\", "\\\\").replace('"', '\\"') + '"' for x in doc_ids]
    )
    answers = []
    async with clientVespa.asyncio() as sess:
        res: VespaQueryResponse = await sess.query(
            yql=f"select * from qa where doc_id in ({query_in})",
            lang="ja",
            hits=5,
        )
        if not res.is_successful():
            logger.warning("Vespa query failed", json=res.json, status=res.status_code)
            return

        hits = [QaModel.model_validate(hit, strict=True) for hit in res.hits]
        answers = [
            {
                "docId": hit.fields.doc_id,
                "answer": hit.fields.answer,
                "score": hit.relevance,
            }
            for hit in hits
        ]

    if not answers:
        logger.warning("No answers found", params=params_parsed)
        return

    system = """あなたには質問(question)と参考資料(references)が与えられます。
あなたの仕事は以下の2つです。

- 与えられた参考資料にかかれている情報のみを使って質問に回答する。
- 参考資料の要約をわかりやすくまとめる。

以下のルールに従ってください:

- 回答には参考資料に書かれている正確な情報のみを反映してください。
- 回答や要約には外部の情報や暗黙の知識は反映しないでください。

以下のフォーマットで出力してください:

```
### 回答

ここに回答を書いてください。

### 要約

ここに要約を書いてください。
```
"""
    user = f"""
## 質問
{params_parsed.query}

## 参考資料
{json.dumps(answers, ensure_ascii=False, indent=2)}
"""
    messages: Iterable[ChatCompletionMessageParam] = [
        {"role": "system", "name": "instruction", "content": system},
        {"role": "user", "name": "info", "content": shot_user},
        {"role": "assistant", "name": "summary", "content": shot_assistant},
        {"role": "user", "name": "info", "content": user},
    ]
    print("OpenAI chat completions", f"messages={messages}")
    stream = await clientOpenAI.chat.completions.create(
        messages=messages,
        model="gpt-4-turbo-2024-04-09",
        stream=True,
    )

    summary = ""
    async for chunk in stream:
        content = chunk.choices[0].delta.content or ""
        summary += content
        # FIXME: sanitize to return only elements that are not dangerous as markdown
        yield content

    await cache_generate_summary.set(key, summary)
    return


@subscription.field("generateSummary")
def resolve_generate_summary(
    summary: str, info: GraphQLResolveInfo, **params: Unpack[GenerateSummaryParams]
) -> GenerateSummarySubscriptionResult:
    assert info and params, "Prevent type check error"
    return {"summary": summary}
