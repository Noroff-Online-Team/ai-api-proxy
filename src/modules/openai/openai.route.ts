import type Elysia from "elysia"

import { chatCompletionsDTO } from "./openai.dto"
import { createCompletion, createStreamCompletion } from "./openai.service"

export const openAIRoutes = (app: Elysia) => {
  app.group("/openai", app =>
    app
      .post("/completions", async ({ body: { prompt } }) => await createCompletion({ prompt }), {
        body: chatCompletionsDTO
      })
      .post("/completions/stream", async ({ body: { prompt } }) => createStreamCompletion({ prompt }), {
        body: chatCompletionsDTO
      })
  )

  return app
}
