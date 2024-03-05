import OpenAI from "openai"

import { OPENAI_API_KEY } from "../constants"

if (!OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY environment variable")
  process.exit(1)
}

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
})
