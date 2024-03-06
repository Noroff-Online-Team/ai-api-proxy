import Elysia from "elysia"

import { PORT } from "./lib/constants"

import { swaggerPlugin } from "./plugins/swagger"
import { corsPlugin } from "./plugins/cors"
import { rateLimitPlugin } from "./plugins/rate-limit"

import { routes } from "./modules/routes"

new Elysia()
  .use(corsPlugin)
  .use(swaggerPlugin)
  .use(rateLimitPlugin)
  .use(routes)
  .get("/", () => ({
    message: "Welcome to the Noroff AI Proxy API!",
    github: "https://github.com/Noroff-Online-Team/ai-api-proxy",
    swagger: "https://ai.api.noroff.dev/docs"
  }))
  .all("*", () => ({
    message: "Hello, world!"
  }))
  .listen(PORT, server => {
    console.log(`🦊 Server running at http://${server?.hostname}:${server?.port}`)
  })
