import { useMediaQuery } from "@uidotdev/usehooks"
import { Search } from "lucide-react"
import { useState } from "react"
import { useQuery } from "urql"
import { AnswerList } from "~/components/answer-list"
import { AnswerSummary } from "~/components/answer-summary"
import { QAHelp } from "~/components/qa-help"
import { QuestionSearch } from "~/components/question-search"
import { CommandDialog } from "~/components/ui/command"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable"
import { Separator } from "~/components/ui/separator"
import { TooltipProvider } from "~/components/ui/tooltip"
import { graphql } from "~/generated/gql"
import { cn } from "~/lib/utils"

const AnswersQuery = graphql(`
  query answers($query: String) {
    answers(query: $query) {
      answers {
        id
        docId
        categoryMajor
        categoryMedium
        categoryMinor
        question
        answer
        score
      }
    }
  }
`)

export function QA() {
  const isMobile = useMediaQuery("only screen and (max-width : 768px)")
  const defaultLayout = [60, 40]

  const [open, setOpen] = useState<boolean>(true)
  const [question, setQuestion] = useState<string>("")
  const [result, _reexecuteQuery] = useQuery({
    query: AnswersQuery,
    variables: { query: question },
  })
  const { data, fetching, error } = result

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction={isMobile ? "vertical" : "horizontal"}
        className={cn(
          "items-stretch h-full",
          isMobile ? "min-h-screen" : "max-h-screen",
        )}
      >
        <ResizablePanel defaultSize={defaultLayout[0]}>
          <div className="flex justify-between items-center px-4 py-2">
            <h1 className="text-xl font-bold">Govsearch</h1>
            <QAHelp />
          </div>
          <Separator />
          <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:min-w-80"
              >
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <span className="truncate hidden pl-4 lg:inline-flex">
                  {question || "Search documentation..."}
                </span>
                <span className="truncate inline-flex pl-4 lg:hidden">
                  {question || "Search..."}
                </span>
              </button>
            </div>
            <CommandDialog open={open} onOpenChange={setOpen}>
              <QuestionSearch
                question={question}
                setOpen={setOpen}
                setQuestion={setQuestion}
              />
            </CommandDialog>
          </div>
          {error ? <p>Oh no... {error.message}</p> : null}
          {!(fetching || error) && (
            <AnswerList items={data?.answers?.answers ?? []} />
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]}>
          <AnswerSummary
            query={question}
            items={data?.answers?.answers ?? []}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
