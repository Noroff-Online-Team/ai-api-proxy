import { Elysia, t } from "elysia"
import { cors } from "@elysiajs/cors"
import { Stream } from "@elysiajs/stream"
import { openai } from "./lib/openai"

import { PORT } from "./constants"
import swagger from "@elysiajs/swagger"

/*
 * TODO:
 * - Restructure project
 *   - https://elysiajs.com/patterns/grouping-routes.html
 * - Reusable function for OpenAI
 *   - Ran into issue here with stream and non-stream responses
 * - Support for other OpenAI endpoints
 * - Support for other OpenAI models
 * - Support for Langchain
 * - Support for other APIs
 *
 * Endpoints:
 * - We should come up with a structure for naming endpoints. I.e /openai/chat/completions and /openai/chat/completions/stream
 */

const app = new Elysia()
  .use(cors())
  .use(swagger({ path: "/docs" }))
  .post(
    "/openai",
    async ({ body: { prompt } }) => {
      return await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      })
    },
    {
      body: t.Object({
        prompt: t.String()
      })
    }
  )
  .post(
    "/openai-stream",
    ({ body: { prompt } }) => {
      return new Stream(
        openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          stream: true,
          messages: [
            {
              role: "user",
              content: prompt
            }
          ]
        })
      )
    },
    {
      body: t.Object({
        prompt: t.String()
      })
    }
  )
  .get("*", () => ({
    message: "Hello, world!"
  }))
  .listen(PORT)

console.log(`🦊 Server running at http://${app.server?.hostname}:${app.server?.port}`)
