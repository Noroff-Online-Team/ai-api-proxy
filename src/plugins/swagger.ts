import type Elysia from "elysia"
import packageJson from "../../package.json"
import swagger from "@elysiajs/swagger"

export const swaggerPlugin = (app: Elysia) =>
  app.use(
    swagger({
      path: "/docs",
      exclude: ["/docs", "/docs/json"],
      documentation: {
        info: {
          title: "Noroff AI API Proxy",
          version: packageJson.version
        }
      }
    })
  )
