import type { LinksFunction } from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react"
import { captureRemixErrorBoundaryError } from "@sentry/remix"
import { Loader2 } from "lucide-react"
import { Provider } from "urql"
import { client } from "~/lib/urql"
import stylesheet from "~/tailwind.css?url"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export const ErrorBoundary = () => {
  const error = useRouteError()
  captureRemixErrorBoundaryError(error)
  return <div>Something went wrong</div>
}

export default function App() {
  return (
    <Provider value={client}>
      <Outlet />
    </Provider>
  )
}

export function HydrateFallback() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <Loader2 className="text-4xl animate-spin" />
      </div>
    </div>
  )
}
