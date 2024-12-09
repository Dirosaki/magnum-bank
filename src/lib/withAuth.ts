import { User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from './auth'

interface NextRequestWithUser extends NextRequest {
  user: User
}

export function withAuth(handler: (request: NextRequestWithUser) => Promise<Response | void>) {
  return async (request: NextRequest) => {
    const user = await auth()

    if (!user) {
      return NextResponse.json(
        {
          message: 'Unauthorized.',
          error: 'UNAUTHORIZED',
        },
        { status: 401 }
      )
    }

    const requestWithUser = request as NextRequestWithUser
    requestWithUser.user = user

    return handler(requestWithUser)
  }
}
