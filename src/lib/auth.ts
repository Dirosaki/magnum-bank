import { JwtPayload, verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'

import { env } from '@/config/env'

import { db } from './db'

async function verifyJwt() {
  const cookiesStore = await cookies()
  const accessToken = cookiesStore.get('accessToken')?.value

  if (!accessToken) return null

  try {
    const { sub: userId } = verify(accessToken, env.jwtSecret) as JwtPayload

    if (!userId) return null

    return userId
  } catch {
    return null
  }
}

export async function auth() {
  const userId = await verifyJwt()

  if (!userId) return null

  const user = await db.user.findUnique({
    where: { id: userId },
  })

  return user
}
