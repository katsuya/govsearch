/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Answer = {
  __typename?: "Answer"
  answer: Scalars["String"]["output"]
  categoryMajor?: Maybe<Scalars["String"]["output"]>
  categoryMedium?: Maybe<Scalars["String"]["output"]>
  categoryMinor?: Maybe<Scalars["String"]["output"]>
  docId: Scalars["String"]["output"]
  id: Scalars["String"]["output"]
  question: Scalars["String"]["output"]
  score?: Maybe<Scalars["Float"]["output"]>
}

export type AnswersPayload = {
  __typename?: "AnswersPayload"
  answers?: Maybe<Array<Answer>>
}

export type GenerateSummaryPayload = {
  __typename?: "GenerateSummaryPayload"
  summary: Scalars["String"]["output"]
}

export type Query = {
  __typename?: "Query"
  answers?: Maybe<AnswersPayload>
  questions?: Maybe<QuestionsPayload>
}

export type QueryAnswersArgs = {
  query?: InputMaybe<Scalars["String"]["input"]>
}

export type QueryQuestionsArgs = {
  query?: InputMaybe<Scalars["String"]["input"]>
}

export type Question = {
  __typename?: "Question"
  categoryMajor?: Maybe<Scalars["String"]["output"]>
  categoryMedium?: Maybe<Scalars["String"]["output"]>
  categoryMinor?: Maybe<Scalars["String"]["output"]>
  docId: Scalars["String"]["output"]
  id: Scalars["String"]["output"]
  question: Scalars["String"]["output"]
}

export type QuestionsPayload = {
  __typename?: "QuestionsPayload"
  questions?: Maybe<Array<Question>>
}

export type Subscription = {
  __typename?: "Subscription"
  generateSummary?: Maybe<GenerateSummaryPayload>
}

export type SubscriptionGenerateSummaryArgs = {
  docIds: Array<Scalars["String"]["input"]>
  query: Scalars["String"]["input"]
}

export type GenerateSummarySubscriptionVariables = Exact<{
  query: Scalars["String"]["input"]
  docIds: Array<Scalars["String"]["input"]> | Scalars["String"]["input"]
}>

export type GenerateSummarySubscription = {
  __typename?: "Subscription"
  generateSummary?: {
    __typename?: "GenerateSummaryPayload"
    summary: string
  } | null
}

export type AnswersQueryVariables = Exact<{
  query?: InputMaybe<Scalars["String"]["input"]>
}>

export type AnswersQuery = {
  __typename?: "Query"
  answers?: {
    __typename?: "AnswersPayload"
    answers?: Array<{
      __typename?: "Answer"
      id: string
      docId: string
      categoryMajor?: string | null
      categoryMedium?: string | null
      categoryMinor?: string | null
      question: string
      answer: string
      score?: number | null
    }> | null
  } | null
}

export type QuestionsQueryVariables = Exact<{
  query?: InputMaybe<Scalars["String"]["input"]>
}>

export type QuestionsQuery = {
  __typename?: "Query"
  questions?: {
    __typename?: "QuestionsPayload"
    questions?: Array<{
      __typename?: "Question"
      id: string
      docId: string
      categoryMajor?: string | null
      categoryMedium?: string | null
      categoryMinor?: string | null
      question: string
    }> | null
  } | null
}

export const GenerateSummaryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "subscription",
      name: { kind: "Name", value: "generateSummary" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "query" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "docIds" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "String" },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "generateSummary" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "query" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "query" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "docIds" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "docIds" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "summary" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GenerateSummarySubscription,
  GenerateSummarySubscriptionVariables
>
export const AnswersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "answers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "query" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "answers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "query" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "query" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "answers" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "docId" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoryMajor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoryMedium" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoryMinor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "question" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "answer" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "score" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AnswersQuery, AnswersQueryVariables>
export const QuestionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "questions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "query" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "query" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "query" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "questions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "docId" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoryMajor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoryMedium" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "categoryMinor" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "question" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<QuestionsQuery, QuestionsQueryVariables>
