import type Elysia from "elysia"

import { openAIRoutes } from "./openai/openai.route"

export const routes = (app: Elysia) => {
  app.use(openAIRoutes)

  return app
}
