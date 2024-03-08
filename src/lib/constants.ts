export const PORT = Number(process.env.PORT) || 3000
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export const ADMIN_API_KEY = process.env.ADMIN_API_KEY
export const NOROFF_API_KEY_HEADER = "X-Noroff-API-Key"
export const ADMIN_PROTECTED_ROUTES = ["/api-key"]
