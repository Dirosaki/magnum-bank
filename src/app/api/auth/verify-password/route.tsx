import { compare } from 'bcryptjs'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { withAuth } from '@/lib/withAuth'

const verifyPasswordSchema = z.object({
  password: z.string().min(1).min(8),
})

export const POST = withAuth(async (request) => {
  const body = await request.json()

  const { success, data, error } = verifyPasswordSchema.safeParse(body)

  if (!success)
    return NextResponse.json(
      {
        error: error.issues,
      },
      { status: 400 }
    )

  const { password } = data

  const isPasswordValid = await compare(password, request.user.password)

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: 'Invalid credentials.', error: 'INVALID_CREDENTIALS' },
      { status: 401 }
    )
  }

  return new NextResponse(null, { status: 204 })
})
