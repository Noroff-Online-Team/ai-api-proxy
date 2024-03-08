import { db } from "../../lib/db"
import type { ApiKeysDTO } from "./apikey.dto"

export async function createApiKeys({ keys }: ApiKeysDTO) {
  return await db.$transaction(
    keys.map(key =>
      db.apiKey.create({
        data: { ownerName: key.ownerName },
        select: {
          id: true,
          ownerName: true,
          key: true
        }
      })
    )
  )
}
