'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'

import { Wave } from '@/assets/elements/wave'
import { Button } from '@/components/ui/button'
import {
  Card,
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

import { RegisterFormData, registerSchema } from './schema'

export default function Register() {
  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const handleSubmit = form.handleSubmit(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })
  })

  return (
    <main className="flex flex-1 bg-gradient-to-t from-black to-card p-4">
      <form className="m-auto w-full max-w-md" onSubmit={handleSubmit}>
        <Card className="relative overflow-hidden border-none">
          <Wave className="absolute -right-16 -top-16 size-44 text-primary" />

          <CardHeader>
            <Image
              alt="Logo da Magnum"
              className="select-none"
              height={48}
              src="/logo-magnum.png"
              width={48}
            />
            <CardTitle className="!mt-4">Cadastre-se</CardTitle>
            <CardDescription>Insira as informações abaixo para criar sua conta.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <FormField>
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" placeholder="Digite seu nome" {...form.register('name')} />
              <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </FormField>
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
            <FormField>
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <PasswordInput
                id="confirmPassword"
                placeholder="Digite sua senha"
                {...form.register('confirmPassword')}
              />
              <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
            </FormField>
          </CardContent>

          <CardFooter className="flex flex-col gap-8">
            <Button className="w-full" disabled={isSubmitting} type="submit">
              {!isSubmitting && 'Cadastrar'}
              {isSubmitting && (
                <Loader2 className="animate-spin duration-700" size={16} strokeWidth={2} />
              )}
            </Button>

            <p className="flex flex-wrap justify-center gap-1 text-nowrap px-4 text-center text-sm text-muted-foreground">
              Já possui uma conta? <Link href="/auth/login">Ir para o login</Link>
            </p>
          </CardFooter>
        </Card>
      </form>
    </main>
  )
}
