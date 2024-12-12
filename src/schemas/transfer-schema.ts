import { z } from 'zod'

const pixSchema = z.object({
  type: z.literal('PIX'),
  recipient: z.object({
    document: z
      .string()
      .min(1, 'CPF/CNPJ é obrigatório')
      .transform((value) => value.replace(/\D/g, ''))
      .refine((value) => value.length === 11 || value.length === 14, 'CPF ou CNPJ inválido'),
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido').trim(),
    pixKey: z.string().min(1, 'Chave Pix é obrigatória').trim(),
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
      .min(1, 'CPF/CNPJ é obrigatório')
      .transform((value) => value.replace(/\D/g, '')),
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido').trim(),
    pixKey: z.union([z.null(), z.undefined()]),
    bank: z.string().min(1, 'Banco é obrigatório').trim(),
    agency: z.string().min(1, 'Agência é obrigatório').min(4, 'Agência deve conter 4 caracteres'),
    account: z.string(),
  }),
})

export const transferSchema = (balance: number) =>
  z.intersection(
    z.object({
      direction: z.literal('SENT'),
      amount: z.coerce
        .number()
        .positive('Valor deve ser maior que zero')
        .refine((value) => value < balance, 'Saldo insuficiente para essa transferência')
        .default(0),
    }),
    z.discriminatedUnion('type', [pixSchema, tedSchema])
  )

export type TransferFormData = z.infer<ReturnType<typeof transferSchema>>
