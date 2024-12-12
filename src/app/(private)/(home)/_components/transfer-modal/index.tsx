'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { PasswordVerifyModal } from '@/components/modals/password-verify-modal'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogContent, DialogFooter } from '@/components/ui/dialog'
import {
  formatTransaction,
  ITransactionFormatted,
  ITransactionResponse,
} from '@/models/transactions'
import { TransferFormData, transferSchema } from '@/schemas/transfer-schema'
import { useStore } from '@/store'
import { errorHandler } from '@/utils/errorHandler'

import { PixTransfer } from './pix-transfer'
import { TedTransfer } from './ted-transfer'

interface TransferModalProps {
  type: 'PIX' | 'TED'
}

interface NewTransactionResponse {
  newBalance: number
  transaction: ITransactionResponse
}

export default function TransferModal({ type }: TransferModalProps) {
  const balance = useStore((state) => state.user.balance)
  const openModal = useStore((state) => state.modal.openModal)
  const closeModal = useStore((state) => state.modal.closeModal)
  const queryClient = useQueryClient()

  const mutate = useMutation({
    mutationFn: async (data: TransferFormData) =>
      axios.post<NewTransactionResponse>('/api/transactions/new', data),
    onSuccess: (response) => {
      useStore.setState((state) => {
        state.user.balance = response.data.newBalance
      })

      const newTransaction = formatTransaction(response.data.transaction)

      queryClient.setQueryData(['transactions'], (oldTransactions: ITransactionFormatted[]) => [
        newTransaction,
        ...oldTransactions,
      ])
    },
  })

  const form = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema(balance)),
    defaultValues: {
      type,
      direction: 'SENT',
    },
  })

  async function handleTransfer() {
    try {
      await mutate.mutateAsync(form.getValues())
      toast.success('Transferência realizada com sucesso')
      closeModal('transfer-modal')
    } catch (error) {
      errorHandler(error)
      closeModal('password-verify-modal')
    }
  }

  const handleSubmit = form.handleSubmit(() => {
    openModal({
      id: 'password-verify-modal',
      children: <PasswordVerifyModal onSubmit={handleTransfer} />,
    })
  })

  return (
    <DialogContent
      className="flex max-h-[calc(100%-48px)] flex-col overflow-y-auto scrollbar-none sm:max-h-[calc(100vh-96px)]"
      closable
    >
      <FormProvider {...form}>
        {type === 'PIX' && <PixTransfer onSubmit={handleSubmit} />}
        {type === 'TED' && <TedTransfer onSubmit={handleSubmit} />}
      </FormProvider>

      <DialogFooter className="flex-row space-x-2">
        <DialogClose asChild>
          <Button className="w-full" type="button" variant="secondary">
            Cancelar
          </Button>
        </DialogClose>
        <Button className="w-full" form="transfer-form" type="submit">
          Transferir
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
