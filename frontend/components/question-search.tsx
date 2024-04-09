import { useDebounce } from "@uidotdev/usehooks"
import { CommandLoading } from "cmdk"
import { type Dispatch, type SetStateAction, useState } from "react"
import { useQuery } from "urql"
import { Badge } from "~/components/ui/badge"
import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import { graphql } from "~/generated/gql"

const QuestionsQuery = graphql(`
  query questions($query: String) {
    questions(query: $query) {
      questions {
        id
        docId
        categoryMajor
        categoryMedium
        categoryMinor
        question
      }
    }
  }
`)

type QuestionSearchProps = {
  question: string
  setOpen: Dispatch<SetStateAction<boolean>>
  setQuestion: Dispatch<SetStateAction<string>>
}

export function QuestionSearch({
  question,
  setOpen,
  setQuestion,
}: QuestionSearchProps) {
  const [query, setQuery] = useState<string>(question)
  const debouncedQuery = useDebounce(query, 200)
  const [result, _reexecuteQuery] = useQuery({
    query: QuestionsQuery,
    variables: { query: debouncedQuery },
  })
  const { data, error } = result

  return (
    <>
      <CommandInput
        value={query}
        onValueChange={(search) => setQuery(search)}
        onKeyDown={(e) => {
          if (
            e.key === "Enter" &&
            !e.nativeEvent.isComposing &&
            // For Safari IME composition bug
            e.keyCode !== 229
          ) {
            setQuestion(debouncedQuery)
            setOpen(false)
            e.preventDefault()
          }
        }}
        placeholder="Type search..."
      />
      <CommandList>
        {error ? (
          <CommandLoading>Oh no... {error.message}</CommandLoading>
        ) : null}
        {0 < (data?.questions?.questions?.length ?? 0) && (
          <CommandGroup heading="Suggestions">
            {data?.questions?.questions?.map((item) => (
              <CommandItem
                key={item.docId}
                className="block"
                onSelect={() => {
                  setQuestion(item.question)
                  setOpen(false)
                }}
              >
                {item.question}
                <div className="pt-2">
                  <Badge variant={"default"}>{item.categoryMajor}</Badge>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </>
  )
}
