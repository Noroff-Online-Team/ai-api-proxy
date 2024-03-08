import { db } from "../../lib/db"
import type { ApiKeysDTO } from "./apikey.dto"

export async function createApiKeys({ keys }: ApiKeysDTO) {
  return await db.apiKey.createMany({
    data: keys.map(key => ({ ownerName: key.ownerName }))
  })
}
