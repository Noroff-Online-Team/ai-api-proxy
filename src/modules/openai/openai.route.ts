import type Elysia from "elysia"

import { chatCompletionsDTO } from "./openai.dto"
import { createCompletion, createStreamCompletion } from "./openai.service"

export const openAIRoutes = (app: Elysia) => {
  app.group("/openai", app =>
    app
      .post("/completions", async ({ body: { messages } }) => await createCompletion({ messages }), {
        body: chatCompletionsDTO
      })
      .post("/completions/stream", async ({ body: { messages } }) => createStreamCompletion({ messages }), {
        body: chatCompletionsDTO
      })
  )

  return app
}
