import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core"
/* eslint-disable */
import * as types from "./graphql"

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "\n  subscription generateSummary(\n    $query: String!\n    $docIds: [String!]!\n  ) {\n    generateSummary(\n      query: $query\n      docIds: $docIds\n    ) {\n      summary\n    }\n  }\n":
    types.GenerateSummaryDocument,
  "\n  query answers($query: String) {\n    answers(query: $query) {\n      answers {\n        id\n        docId\n        categoryMajor\n        categoryMedium\n        categoryMinor\n        question\n        answer\n        score\n      }\n    }\n  }\n":
    types.AnswersDocument,
  "\n  query questions($query: String) {\n    questions(query: $query) {\n      questions {\n        id\n        docId\n        categoryMajor\n        categoryMedium\n        categoryMinor\n        question\n      }\n    }\n  }\n":
    types.QuestionsDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  subscription generateSummary(\n    $query: String!\n    $docIds: [String!]!\n  ) {\n    generateSummary(\n      query: $query\n      docIds: $docIds\n    ) {\n      summary\n    }\n  }\n",
): (typeof documents)["\n  subscription generateSummary(\n    $query: String!\n    $docIds: [String!]!\n  ) {\n    generateSummary(\n      query: $query\n      docIds: $docIds\n    ) {\n      summary\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query answers($query: String) {\n    answers(query: $query) {\n      answers {\n        id\n        docId\n        categoryMajor\n        categoryMedium\n        categoryMinor\n        question\n        answer\n        score\n      }\n    }\n  }\n",
): (typeof documents)["\n  query answers($query: String) {\n    answers(query: $query) {\n      answers {\n        id\n        docId\n        categoryMajor\n        categoryMedium\n        categoryMinor\n        question\n        answer\n        score\n      }\n    }\n  }\n"]
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "\n  query questions($query: String) {\n    questions(query: $query) {\n      questions {\n        id\n        docId\n        categoryMajor\n        categoryMedium\n        categoryMinor\n        question\n      }\n    }\n  }\n",
): (typeof documents)["\n  query questions($query: String) {\n    questions(query: $query) {\n      questions {\n        id\n        docId\n        categoryMajor\n        categoryMedium\n        categoryMinor\n        question\n      }\n    }\n  }\n"]

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
