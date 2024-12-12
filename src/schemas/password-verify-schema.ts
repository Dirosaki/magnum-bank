import { z } from 'zod'

export const passwordVerifySchema = z.object({
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .default(''),
})

export type PasswordVerifyFormData = z.infer<typeof passwordVerifySchema>
