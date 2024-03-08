import { t, type Static } from "elysia"

export const apiKeyDTO = t.Object({
  ownerName: t.String({ description: "The name of the owner of the API key" })
})

export const apiKeysDTO = t.Object({
  keys: t.Array(apiKeyDTO)
})

export type ApiKeysDTO = Static<typeof apiKeysDTO>
