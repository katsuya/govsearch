from typing_extensions import ClassVar, List, Optional, TypedDict


Query = TypedDict(
    "Query",
    {
        "questions": "QuestionsQueryResult",
        "answers": "AnswersQueryResult",
    },
)


QuestionsParams = TypedDict(
    "QuestionsParams",
    {
        "query": Optional[str],
    },
)


QuestionsQueryResult = ClassVar[Optional["QuestionsPayload"]]


AnswersParams = TypedDict(
    "AnswersParams",
    {
        "query": Optional[str],
    },
)


AnswersQueryResult = ClassVar[Optional["AnswersPayload"]]


Subscription = TypedDict(
    "Subscription",
    {
        "generateSummary": "GenerateSummarySubscriptionResult",
    },
)


GenerateSummaryParams = TypedDict(
    "GenerateSummaryParams",
    {
        "query": str,
        "docIds": List[str],
    },
)


GenerateSummarySubscriptionResult = ClassVar[Optional["GenerateSummaryPayload"]]


AnswersPayload = TypedDict(
    "AnswersPayload",
    {
        "answers": Optional[List["Answer"]],
    },
)


QuestionsPayload = TypedDict(
    "QuestionsPayload",
    {
        "questions": Optional[List["Question"]],
    },
)


GenerateSummaryPayload = TypedDict(
    "GenerateSummaryPayload",
    {
        "summary": str,
    },
)


Answer = TypedDict(
    "Answer",
    {
        "id": str,
        "docId": str,
        "categoryMajor": Optional[str],
        "categoryMedium": Optional[str],
        "categoryMinor": Optional[str],
        "question": str,
        "answer": str,
        "score": Optional[float],
    },
)


Question = TypedDict(
    "Question",
    {
        "id": str,
        "docId": str,
        "categoryMajor": Optional[str],
        "categoryMedium": Optional[str],
        "categoryMinor": Optional[str],
        "question": str,
    },
)
