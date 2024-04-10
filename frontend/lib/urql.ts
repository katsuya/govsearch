import {
  type SubscribePayload,
  createClient as createWSClient,
} from "graphql-ws"
import {
  Client,
  cacheExchange,
  fetchExchange,
  ssrExchange,
  subscriptionExchange,
} from "urql"

const isClientSide = typeof window !== "undefined"

const ssr = ssrExchange({ isClient: isClientSide })

let wsClient: ReturnType<typeof createWSClient>
if (isClientSide) {
  const protocol = window.location.protocol === "https:" ? "wss" : "ws"
  const port = window.location.port ? `:${window.location.port}` : ""
  wsClient = createWSClient({
    url: `${protocol}://${window.location.hostname}${port}/ws/graphql`,
  })
}

export const client = new Client({
  url: "/graphql",
  exchanges: [
    cacheExchange,
    ssr,
    fetchExchange,
    ...(isClientSide
      ? [
          subscriptionExchange({
            forwardSubscription(operation) {
              return {
                subscribe: (sink) => {
                  const dispose = wsClient.subscribe(
                    operation as SubscribePayload,
                    sink,
                  )
                  return {
                    unsubscribe: dispose,
                  }
                },
              }
            },
          }),
        ]
      : []),
  ],
})
