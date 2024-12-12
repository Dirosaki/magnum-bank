import { ChangeEvent } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { CurrencyInput } from '@/components/ui/currency-input'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ErrorMessage } from '@/components/ui/error-message'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TransferFormData } from '@/schemas/transfer-schema'
import { formatDocument } from '@/utils/formatDocument'
import { numberMask } from '@/utils/masks'

export function TedTransfer({ onSubmit }: { onSubmit: () => void }) {
  const {
    formState: { errors },
    ...form
  } = useFormContext<TransferFormData>()

  return (
    <>
      <DialogHeader>
        <DialogTitle>Transferência TED</DialogTitle>
        <DialogDescription>
          Envie dinheiro entre contas bancárias com segurança e rapidez.
        </DialogDescription>
      </DialogHeader>

      <form
        autoComplete="off"
        className="h-full flex-1 space-y-4"
        id="transfer-form"
        noValidate
        onSubmit={onSubmit}
      >
        <FormField>
          <Label htmlFor="amount">Valor da transferência</Label>
          <Controller
            control={form.control}
            name="amount"
            render={({ field }) => (
              <CurrencyInput id="amount" value={field.value} onChange={field.onChange} />
            )}
          />

          <ErrorMessage>{errors.amount?.message}</ErrorMessage>
        </FormField>
        <FormField>
          <Label htmlFor="document">CPF/CNPJ do favorecido</Label>
          <Input
            id="document"
            inputMode="numeric"
            maxLength={18}
            placeholder="Digite o CPF ou CNPJ do favorecido"
            {...form.register('recipient.document', {
              onChange: (event) => {
                event.target.value = formatDocument(event.target.value)
              },
            })}
          />
          <ErrorMessage>{errors.recipient?.document?.message}</ErrorMessage>
        </FormField>
        <FormField>
          <Label htmlFor="email">E-mail do favorecido</Label>
          <Input
            id="email"
            inputMode="email"
            placeholder="Digite o e-mail do favorecido"
            type="email"
            {...form.register('recipient.email')}
          />
          <ErrorMessage>{errors.recipient?.email?.message}</ErrorMessage>
        </FormField>
        <FormField>
          <Label htmlFor="bank">Banco</Label>
          <Input
            id="bank"
            placeholder="Digite o nome do banco"
            {...form.register('recipient.bank')}
          />
          <ErrorMessage>{errors.recipient?.bank?.message}</ErrorMessage>
        </FormField>
        <FormField>
          <Label htmlFor="agency">Agência</Label>
          <Input
            id="agency"
            inputMode="numeric"
            maxLength={4}
            placeholder="Digite o número da agência"
            {...form.register('recipient.agency', {
              onChange: (event: ChangeEvent<HTMLInputElement>) => {
                event.target.value = numberMask(event.target.value)
              },
            })}
          />
          <ErrorMessage>{errors.recipient?.agency?.message}</ErrorMessage>
        </FormField>
        <FormField>
          <Label htmlFor="account">Conta</Label>
          <Input
            id="account"
            inputMode="numeric"
            placeholder="Digite o nome do banco"
            {...form.register('recipient.account', {
              onChange: (event: ChangeEvent<HTMLInputElement>) => {
                event.target.value = numberMask(event.target.value)
              },
            })}
          />
          <ErrorMessage>{errors.recipient?.account?.message}</ErrorMessage>
        </FormField>
      </form>
    </>
  )
}
