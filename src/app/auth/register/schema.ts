import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório').default(''),
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido').default(''),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .default(''),
    confirmPassword: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .default(''),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message: 'Senhas não coincidem',
  })

export type RegisterFormData = z.infer<typeof registerSchema>
