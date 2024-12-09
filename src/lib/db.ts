import { PrismaClient } from '@prisma/client'

declare const globalThis: typeof global & {
  prismaGlobal?: PrismaClient
}

export const db = globalThis.prismaGlobal ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db
