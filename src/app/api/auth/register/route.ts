import { hash } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { db } from '@/lib/db'
import { generateRandomBalance } from '@/utils/generateRandomBalance'

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1).min(8),
})

export async function POST(request: NextRequest) {
  const body = await request.json()

  const { success, data, error } = registerSchema.safeParse(body)

  if (!success)
    return NextResponse.json(
      {
        message: error.issues,
        error: 'ZOD_ERROR',
      },
      { status: 400 }
    )

  const { name, email, password } = data

  const userAlreadyExists = await db.user.findUnique({
    where: { email },
    select: { id: true },
  })

  if (userAlreadyExists) {
    return NextResponse.json(
      { message: 'User already exists.', error: 'USER_ALREADY_EXISTS' },
      { status: 409 }
    )
  }

  const hashedPassword = await hash(password, 12)

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      balance: generateRandomBalance(),
    },
  })

  return new NextResponse(null, { status: 204 })
}
