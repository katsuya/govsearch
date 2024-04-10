/// <reference types="@remix-run/node" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_SENTRY_DNS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
