import type { MetaFunction } from "@remix-run/node"
import { QA } from "~/components/qa"

export const meta: MetaFunction = () => {
  return [
    { title: "Govsearch" },
    {
      name: "description",
      content:
        "Instead of using a chatbot approach like Govbot, we tried to solve the problem with a search-based approach.",
    },
  ]
}

export default function Index() {
  return <QA />
}
