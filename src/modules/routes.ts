import type Elysia from "elysia"

import { openAIRoutes } from "./openai/openai.route"

export const routes = (app: Elysia) => {
  // Register routes
  app.use(openAIRoutes)
  // ...

  return app
}
