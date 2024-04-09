---
title: Govsearch
emoji: 🏆
colorFrom: purple
colorTo: pink
sdk: docker
pinned: true
license: agpl-3.0
app_port: 7860
---

# Govsearch

Govsearch is an unofficial search application for Japanese government
documents. Similar to Govbot(https://www.govbot.go.jp/), its aim is to
improve accessibility to government documents, but it adopts a search
approach instead of a chatbot. Internally, it utilizes Vespa as the
search engine, Starlette for the backend, Remix for the frontend, and
relies on documents provided by Govbot.

## Usage

To run the application, you need to have Docker installed. Then, you
can run the following command:

```sh
echo "OPENAI_API_KEY=sk-xxx" > .env
docker build -t govsearch . && docker run -it -p 7860:7860 govsearch
open http://localhost:7860
```

To develop the application, you can run the following command:

```sh
echo "OPENAI_API_KEY=sk-xxx" > .env
docker compose up -d
(cd backend_vespa && make deploy && make feed)
open http://localhost:7861
```

## References

- Govbot
    - https://govbot.go.jp/
    - https://www.soumu.go.jp/main_sosiki/hyouka/soudan_n/kyotsucb_top.html#faq
- Backend
    - https://www.starlette.io/
    - https://ariadnegraphql.org/docs/intro
    - https://docs.pydantic.dev/latest/why/
    - https://github.com/openai/openai-python
    - https://rye-up.com/
- Search
    - https://docs.vespa.ai/en/text-matching.html
- Graphql
    - https://graphql.org/learn/
    - https://the-guild.dev/graphql/codegen/docs/guides/react-vue
    - https://the-guild.dev/graphql/ws/get-started
    - https://github.com/enisdenjo/graphql-ws
    - https://github.com/sauldom102/gql_schema_codegen
- Frontend
    - https://remix.run/docs/en/main/file-conventions/vite-config
    - https://biomejs.dev/linter/rules/
- UI Libraries
    - https://tailwindcss.com/docs/utility-first
    - https://ui.shadcn.com/docs
- UI Issues
    - https://github.com/radix-ui/primitives/issues/2783
    - https://github.com/shadcn-ui/ui/issues/3256
    - https://github.com/pacocoursey/cmdk/issues/206
    - https://dninomiya.github.io/form-guide/stop-enter-submit
- Typescript
    - https://www.typescriptlang.org/cheatsheets
    - https://www.typescriptlang.org/docs/handbook/modules/introduction.html
    - https://www.typescriptlang.org/docs/handbook/declaration-merging.html
    - https://www.typescriptlang.org/docs/handbook/utility-types.html
    - https://www.typescriptlang.org/docs/handbook/2/types-from-types.html
    - https://www.typescriptlang.org/docs/handbook/2/narrowing.html
- Python
    - https://docs.python.org/3/glossary.html
    - https://docs.python.org/3/tutorial/index.html
    - https://docs.python.org/3/library/ast.html
    - https://docs.python.org/3/library/typing.html
    - https://docs.python.org/3/library/asyncio.html
- Docker
    - https://github.com/vespa-engine/docker-image/tree/master
    - https://docs.docker.com/build/building/multi-stage/
- Git
    - https://github.com/git-lfs/git-lfs/wiki/Tutorial
