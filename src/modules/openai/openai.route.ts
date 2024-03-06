import Elysia from "elysia"

import { chatCompletionsDTO } from "./openai.dto"
import { createCompletion, createStreamCompletion } from "./openai.service"

export const openAIRoutes = new Elysia({ prefix: "/openai" })
  .post("/completions", async ({ body: { messages } }) => await createCompletion({ messages }), {
    body: chatCompletionsDTO
  })
  .post("/completions/stream", async ({ body: { messages } }) => createStreamCompletion({ messages }), {
    body: chatCompletionsDTO
  })
