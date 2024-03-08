import Elysia from "elysia"

import { apiKeysDTO } from "./apikey.dto"
import { createApiKeys } from "./apikey.service"

export const apiKeyRoutes = new Elysia({ prefix: "/api-key" }).post(
  "/",
  async ({ body }) => await createApiKeys(body),
  {
    body: apiKeysDTO
  }
)
