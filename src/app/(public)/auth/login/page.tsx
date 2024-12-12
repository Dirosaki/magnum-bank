'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ErrorMessage } from '@/components/ui/error-message'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from '@/components/ui/link'
import { PasswordInput } from '@/components/ui/password-input'
import { LoginFormData, loginSchema } from '@/schemas/login-schema'
import { errorHandler } from '@/utils/errorHandler'

export default function Login() {
  const router = useRouter()
  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const handleSubmit = form.handleSubmit(async ({ email, password }) => {
    try {
      await axios.post('/api/auth/login', { email, password })

      router.push('/')
      toast.success('Login feito com sucesso!')
    } catch (error) {
      errorHandler(error)
    }
  })

  return (
    <>
      <title>Login - Magnum Bank</title>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="!mt-4">Entrar</CardTitle>
          <CardDescription>Insira suas credenciais para acessar sua conta.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              inputMode="email"
              placeholder="Digite seu e-mail"
              type="email"
              {...form.register('email')}
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </FormField>

          <FormField>
            <Label htmlFor="password">Senha</Label>
            <PasswordInput
              id="password"
              placeholder="Digite sua senha"
              {...form.register('password')}
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </FormField>
        </CardContent>

        <CardFooter className="flex flex-col gap-8">
          <Button className="w-full" disabled={isSubmitting} type="submit">
            {!isSubmitting && 'Entrar'}
            {isSubmitting && (
              <Loader2 className="animate-spin duration-700" size={16} strokeWidth={2} />
            )}
          </Button>

          <p className="flex flex-wrap justify-center gap-1 text-nowrap px-4 text-center text-sm text-muted-foreground">
            Ainda não possui uma conta? <Link href="/auth/register">Cadastre-se</Link>
          </p>
        </CardFooter>
      </form>
    </>
  )
}
