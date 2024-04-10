import { Badge } from "~/components/ui/badge"
import { ScrollArea } from "~/components/ui/scroll-area"
import type { AnswersQuery } from "~/generated/graphql"
import { cn } from "~/lib/utils"

type AnswerListProps = {
  items: NonNullable<NonNullable<AnswersQuery["answers"]>["answers"]>
}

export function AnswerList({ items }: AnswerListProps) {
  return (
    <ScrollArea className="h-screen">
      {0 < items.length ? (
        <div className="flex flex-col gap-2 p-4 pt-0">
          {items.map((item) => (
            <div
              key={item.docId}
              className={cn(
                "flex flex-col items-start gap-5 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              )}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.question}</div>
                  </div>
                </div>
              </div>
              <article className="prose prose-sm">
                <div
                  className="whitespace-pre-line"
                  /* biome-ignore lint/security/noDangerouslySetInnerHtml:  */
                  dangerouslySetInnerHTML={{
                    __html: unsafeConvertToAnchorTag(item.answer),
                  }}
                />
              </article>
              {(item.categoryMajor ??
                item.categoryMinor ??
                item.categoryMedium) && (
                <div className="flex text-xs items-center gap-2">
                  {item.categoryMajor && (
                    <Badge variant={"default"}>{item.categoryMajor}</Badge>
                  )}
                  {item.categoryMedium && (
                    <Badge variant={"secondary"}>{item.categoryMedium}</Badge>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-4 md:pt-8 text-center text-muted-foreground text-sm leading-6">
          <p className="mb-2">ヒント:</p>
          <ul>
            <li>児童手当の申請期限を教えてください</li>
            <li>マイナンバーカードに記載されている電子証明書とは？</li>
            <li>年金は「いつから」「いくら」受け取れますか？</li>
          </ul>
        </div>
      )}
    </ScrollArea>
  )
}

// FIXME: This function is not safe. It should be replaced with a safer
// implementation.
function unsafeConvertToAnchorTag(inputText: string) {
  const regex = /<([^,]+),(http[^>]+)>/g
  return inputText.replace(regex, (_match, text, url) => {
    const escapedText = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
    return `<a target="_brank" href="${url.trim()}">${escapedText.trim()}</a>`
  })
}
