import type { EntryContext } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import { renderToString } from "react-dom/server"

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  let html = renderToString(
    <RemixServer context={remixContext} url={request.url} />,
  )
  // biome-ignore lint/style/useTemplate: generated code
  html = "<!DOCTYPE html>\n" + html
  return new Response(html, {
    headers: { "Content-Type": "text/html" },
    status: responseStatusCode,
  })
}
