import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { withAuth } from '@/lib/withAuth'

export const GET = withAuth(async (request) => {
  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId: request.user.id,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        type: true,
        direction: true,
        amount: true,
        document: true,
        email: true,
        name: true,
        createdAt: true,
        bank: true,
        agency: true,
        account: true,
        pixKey: true,
      },
    })

    return NextResponse.json({ transactions })
  } catch {
    return NextResponse.json(
      { message: 'Transactions not found.', error: 'TRANSACTIONS_NOT_FOUND' },
      { status: 404 }
    )
  }
})
