import Elysia from "elysia"
import { httpErrorDecorator } from "elysia-http-error"

import { db } from "../lib/db"

import { openAIRoutes } from "./openai/openai.route"
import { apiKeyRoutes } from "./apikey/apikey.route"

const API_KEY_HEADER = "X-Noroff-API-Key"

export const routes = new Elysia()
  .use(httpErrorDecorator)
  .decorate("db", db)
  .guard(
    {
      async beforeHandle({ headers, db, HttpError }) {
        const apiKey = headers[API_KEY_HEADER.toLowerCase()]

        // If the API key is missing, return an error
        if (!apiKey) {
          throw HttpError.Unauthorized("No API key header was found")
        }

        // If the API key is an array, return an error
        if (Array.isArray(apiKey)) {
          throw HttpError.BadRequest("API key must be a string")
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
