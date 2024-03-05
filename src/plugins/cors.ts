import type Elysia from "elysia"
import cors from "@elysiajs/cors"

export const corsPlugin = (app: Elysia) => app.use(cors())
