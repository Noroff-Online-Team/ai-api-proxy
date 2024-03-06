import Elysia from "elysia"

import { PORT } from "./lib/constants"

import { swaggerPlugin } from "./plugins/swagger"
import { corsPlugin } from "./plugins/cors"
import { rateLimitPlugin } from "./plugins/rate-limit"

import { routes } from "./modules/routes"

/*
 * TODO:
 * - Support for other OpenAI endpoints
 * - Support for other OpenAI models
 * - Support for Langchain
 * - Support for other APIs
 */

const app = new Elysia()

app.use(corsPlugin)
app.use(swaggerPlugin)
app.use(rateLimitPlugin)

app.use(routes)

app.all("*", () => ({
  message: "Welcome to the Noroff AI Proxy API!",
  github: "https://github.com/Noroff-Online-Team/ai-api-proxy",
  swagger: "https://ai.api.noroff.dev/docs"
}))

app.listen(PORT, server => {
  console.log(`🦊 Server running at http://${server?.hostname}:${server?.port}`)
})
