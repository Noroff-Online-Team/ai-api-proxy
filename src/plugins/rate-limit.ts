import type Elysia from "elysia"
import { rateLimit } from "elysia-rate-limit"

export const rateLimitPlugin = (app: Elysia) =>
  app.use(
    rateLimit({
      max: 600,
      duration: 10 * 60 * 1000, // 10 minutes,
      generator: (req, server) =>
        req.headers.get("true-client-ip") ??
        req.headers.get("x-forwarded-for") ??
        server?.requestIP(req)?.address ??
        "",
      responseMessage: {
        status: 429,
        error: "Too Many Requests",
        message: "You are being rate limited"
      }
    })
  )
