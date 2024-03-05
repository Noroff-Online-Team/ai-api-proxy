import { t, type Static } from "elysia"

export const chatCompletionsDTO = t.Object({
  messages: t.Array(
    t.Object({
      role: t.Enum(
        {
          user: "user",
          assistant: "assistant"
        },
        {
          examples: ["user"],
          description:
            "This can be either `user` or `assistant`. See the [OpenAI documentation](https://platform.openai.com/docs/api-reference/chat/create) for more information."
        }
      ),
      content: t.String({
        examples: ["This is a message"],
        description: "Message content"
      })
    })
  )
})

export type ChatCompletionsDTO = Static<typeof chatCompletionsDTO>
