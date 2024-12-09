import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { env } from '@/config/env'
import { db } from '@/lib/db'

const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).min(8),
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { success, data, error } = loginSchema.safeParse(body)

  if (!success) return NextResponse.json({ error: error.issues }, { status: 400 })

  const { email, password } = data

  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user) {
    return NextResponse.json(
      { message: 'Invalid credentials.', error: 'INVALID_CREDENTIALS' },
      { status: 401 }
    )
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: 'Invalid credentials.', error: 'INVALID_CREDENTIALS' },
      { status: 401 }
    )
  }

  const accessToken = sign(
    {
      sub: user.id,
    },
    env.jwtSecret,
    {
      expiresIn: '7d',
    }
  )

  const response = NextResponse.json({ accessToken }, { status: 200 })

  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })

  return response
}
