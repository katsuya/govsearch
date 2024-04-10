import { vitePlugin as remix } from "@remix-run/dev"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  server: {
    proxy: {
      "/graphql": {
        target: "http://127.0.0.1:7860",
        changeOrigin: false,
      },
      "/ws/graphql": {
        target: "ws://127.0.0.1:7860",
        changeOrigin: false,
        ws: true,
      },
    },
  },
  plugins: [
    remix({
      appDirectory: "frontend",
      ssr: false,
    }),
    tsconfigPaths(),
  ],
})
