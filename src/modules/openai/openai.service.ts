import Stream from "@elysiajs/stream"
import { openai } from "../../lib/openai"

interface CreateCompletion {
  prompt: string
}

export async function createCompletion({ prompt }: CreateCompletion) {
  return await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  })
}

export async function createStreamCompletion({ prompt }: CreateCompletion) {
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
}
