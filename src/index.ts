import Elysia from "elysia"

import { PORT } from "./lib/constants"

import { swaggerPlugin } from "./plugins/swagger"
import { corsPlugin } from "./plugins/cors"

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

app.use(routes)

app.get("*", () => ({
  message: "Hello, world!"
}))

app.listen(PORT, server => {
  console.log(`🦊 Server running at http://${server?.hostname}:${server?.port}`)
})
