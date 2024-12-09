import { NextResponse } from 'next/server'
import { z } from 'zod'

import { db } from '@/lib/db'
import { withAuth } from '@/lib/withAuth'

const pixSchema = z.object({
  type: z.literal('PIX'),
  recipient: z.object({
    name: z.string().min(1).trim(),
    document: z
      .string()
      .min(1)
      .transform((value) => value.replace(/\D/g, ''))
      .refine((value) => value.length === 11 || value.length === 14, 'Invalid document'),
    email: z.string().email().trim(),
    pixKey: z.string().min(1).trim(),
    bank: z.union([z.null(), z.undefined()]),
    agency: z.union([z.null(), z.undefined()]),
    account: z.union([z.null(), z.undefined()]),
  }),
})

const tedSchema = z.object({
  type: z.literal('TED'),
  recipient: z.object({
    document: z
      .string()
      .min(1)
      .transform((value) => value.replace(/\D/g, ''))
      .refine((value) => value.length === 11 || value.length === 14, 'Invalid document'),
    email: z.string().email().trim(),
    pixKey: z.union([z.null(), z.undefined()]),
    bank: z.string().min(1).trim(),
    agency: z.string().min(1).min(4),
    account: z.string(),
  }),
})

export const transferSchema = z.intersection(
  z.object({
    direction: z.literal('SENT'),
    amount: z.coerce.number().positive(),
  }),
  z.discriminatedUnion('type', [pixSchema, tedSchema])
)

export const POST = withAuth(async (request) => {
  try {
    const body = await request.json()

    const { success, data, error } = transferSchema.safeParse(body)

    if (!success)
      return NextResponse.json(
        {
          error: error.issues,
        },
        { status: 400 }
      )

    if (data.amount > request.user.balance) {
      return NextResponse.json(
        {
          message: 'Insufficient balance.',
          error: 'INSUFFICIENT_BALANCE',
        },
        { status: 400 }
      )
    }

    const recipient = await db.user.findUnique({
      where: { email: data.recipient.email },
    })

    if (!recipient) {
      return NextResponse.json(
        {
          message: 'Recipient not found.',
          error: 'RECIPIENT_NOT_FOUND',
        },
        { status: 404 }
      )
    }

    const { 0: user, 2: transaction } = await db.$transaction([
      db.user.update({
        where: { id: request.user.id },
        data: {
          balance: {
            decrement: data.amount,
          },
        },
      }),
      db.user.update({
        where: { id: recipient.id },
        data: {
          balance: {
            increment: data.amount,
          },
        },
      }),
      db.transaction.create({
        data: {
          type: data.type,
          direction: 'SENT',
          amount: data.amount,
          document: data.recipient.document,
          email: data.recipient.email,
          name: recipient.name,
          bank: data.recipient.bank,
          agency: data.recipient.agency,
          account: data.recipient.account,
          pixKey: data.recipient.pixKey,
          userId: request.user.id,
        },
      }),
      db.transaction.create({
        data: {
          type: data.type,
          direction: 'RECEIVED',
          amount: data.amount,
          document: data.recipient.document,
          email: request.user.email,
          name: request.user.name,
          bank: data.recipient.bank,
          agency: data.recipient.agency,
          account: data.recipient.account,
          pixKey: data.recipient.pixKey,
          userId: recipient.id,
        },
      }),
    ])

    return NextResponse.json({ newBalance: user.balance, transaction })
  } catch (error) {
    return NextResponse.json(
      { message: 'Transaction', error: 'TRANSACTION_FAILED' },
      { status: 404 }
    )
  }
})
