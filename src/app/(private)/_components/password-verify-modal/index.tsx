import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ErrorMessage } from '@/components/ui/error-message'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { useStore } from '@/store'
import { errorHandler } from '@/utils/errorHandler'

import { PasswordVerifyFormData, passwordVerifySchema } from './schema'

interface PasswordVerifyModalProps {
  onSubmit: () => Promise<void>
}

export function PasswordVerifyModal({ onSubmit }: PasswordVerifyModalProps) {
  const {
    formState: { errors, isSubmitting },
    ...form
  } = useForm<PasswordVerifyFormData>({
    resolver: zodResolver(passwordVerifySchema),
  })

  const closeModal = useStore((state) => state.modal.closeModal)

  const mutation = useMutation({
    mutationFn: async (data: { password: string }) => axios.post('/api/auth/verify-password', data),
  })

  const handleSubmit = form.handleSubmit(async (formData) => {
    try {
      await mutation.mutateAsync(formData)
      await onSubmit()
      closeModal('password-verify-modal')
    } catch (error) {
      errorHandler(error)
    }
  })

  return (
    <DialogContent
      className="flex max-h-full flex-col overflow-y-auto scrollbar-none sm:max-h-[calc(100vh-96px)]"
      closable
    >
      <DialogHeader>
        <DialogTitle>Confirme a sua senha</DialogTitle>
        <DialogDescription>Finalize a transação com sua senha de acesso.</DialogDescription>
      </DialogHeader>
      <form autoComplete="off" id="password-verify-form" onSubmit={handleSubmit}>
        <FormField>
          <Input
            placeholder="Digite  sua senha"
            type="password"
            autoFocus
            {...form.register('password')}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </FormField>
      </form>
      <DialogFooter className="flex-row space-x-2">
        <Button
          className="w-full"
          type="button"
          variant="secondary"
          onClick={() => closeModal('password-verify-modal')}
        >
          Voltar
        </Button>
        <Button
          className="w-full"
          disabled={isSubmitting}
          form="password-verify-form"
          type="submit"
        >
          {!isSubmitting && 'Confirmar'}
          {isSubmitting && (
            <Loader2 className="animate-spin duration-700" size={16} strokeWidth={2} />
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
