import Elysia from "elysia"
import { httpErrorDecorator } from "elysia-http-error"

import { db } from "../lib/db"
import { ADMIN_API_KEY, NOROFF_API_KEY_HEADER, ADMIN_PROTECTED_ROUTES } from "../lib/constants"

import { openAIRoutes } from "./openai/openai.route"
import { apiKeyRoutes } from "./apikey/apikey.route"

export const routes = new Elysia()
  .use(httpErrorDecorator)
  .decorate("db", db)
  .guard(
    {
      async beforeHandle({ headers, db, HttpError, request }) {
        const apiKey = headers[NOROFF_API_KEY_HEADER.toLowerCase()]
        const { pathname } = new URL(request.url)

        // If the API key is missing, return an error
        if (!apiKey) {
          throw HttpError.Unauthorized("No API key header was found")
        }

        // If the API key is an array, return an error
        if (Array.isArray(apiKey)) {
          throw HttpError.BadRequest("API key must be a string")
        }

        // If path is protected and the API key is the admin key, allow the request. If not, return an error
        if (ADMIN_PROTECTED_ROUTES.includes(pathname)) {
          if (apiKey === ADMIN_API_KEY) {
            return
          }
          throw HttpError.Forbidden("You don't have permission to access this resource")
        }

        // Find the key in the database
        const keyRecord = await db.apiKey.findUnique({
          where: { key: apiKey }
        })

        // If the key doesn't exist or is inactive, return an error
        if (!keyRecord || keyRecord.status !== "ACTIVE") {
          throw HttpError.Forbidden("Invalid API key")
        }
      }
    },
    app => app.use(openAIRoutes).use(apiKeyRoutes)
  )
