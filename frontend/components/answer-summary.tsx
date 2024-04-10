import Markdown from "marked-react"
import { useEffect, useState } from "react"
import { useClient } from "urql"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Separator } from "~/components/ui/separator"
import { graphql } from "~/generated/gql"
import type { AnswersQuery, Subscription } from "~/generated/graphql"

const GenerateSummarySubscription = graphql(`
  subscription generateSummary(
    $query: String!
    $docIds: [String!]!
  ) {
    generateSummary(
      query: $query
      docIds: $docIds
    ) {
      summary
    }
  }
`)

type AnswerSummaryProps = {
  query: string
  items: NonNullable<NonNullable<AnswersQuery["answers"]>["answers"]>
}

export function AnswerSummary({ query, items }: AnswerSummaryProps) {
  const client = useClient()
  const [summary, setSummary] = useState<string | undefined>()

  useEffect(() => {
    setSummary(undefined)
    const { unsubscribe } = client
      .subscription<Subscription>(GenerateSummarySubscription, {
        query,
        docIds: items.map((x) => x.docId).slice(0, 10),
      })
      .subscribe((result) => {
        setSummary(
          (prev) =>
            (prev ?? "") + (result.data?.generateSummary?.summary ?? ""),
        )
      })
    return () => {
      unsubscribe()
    }
  }, [query, items, client])

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">TL;DR</h1>
      </div>
      <Separator />
      <ScrollArea className="h-screen">
        {summary ? (
          <div className="flex flex-1 flex-col">
            <div className="flex-1 p-4">
              <article className="prose prose-sm max-w-none overscroll-auto mb-[550px] sm:mb-0">
                <Markdown>{summary}</Markdown>
              </article>
            </div>
          </div>
        ) : (
          <div className="pt-8 md:pt-40 text-center text-muted-foreground text-sm">
            検索結果がまだありません
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
