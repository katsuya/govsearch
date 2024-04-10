import { RemixBrowser, useLocation, useMatches } from "@remix-run/react"
import * as Sentry from "@sentry/remix"
import { StrictMode, startTransition, useEffect } from "react"
import { hydrateRoot } from "react-dom/client"

Sentry.init({
  dsn: import.meta.env.VITE_APP_SENTRY_DNS,
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,

  integrations: [
    Sentry.browserTracingIntegration({
      useEffect,
      useLocation,
      useMatches,
    }),
    Sentry.replayIntegration(),
  ],
})

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  )
})
