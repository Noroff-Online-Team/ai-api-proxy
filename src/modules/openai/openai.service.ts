import Stream from "@elysiajs/stream"
import { openai } from "../../lib/openai"

import type { ChatCompletionsDTO } from "./openai.dto"

export async function createCompletion({ messages }: ChatCompletionsDTO) {
  return await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages
  })
}

export async function createStreamCompletion({ messages }: ChatCompletionsDTO) {
  return new Stream(
    openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages
    })
  )
}
