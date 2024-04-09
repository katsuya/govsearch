import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema/graphql_*.graphql",
  documents: "frontend/**/*.{ts,tsx}",
  ignoreNoDocuments: true,
  generates: {
    "frontend/generated/": {
      preset: "client",
      plugins: [],
      config: {
        enumsAsTypes: true,
        strictScalars: true,
      },
    },
  },
}

export default config
