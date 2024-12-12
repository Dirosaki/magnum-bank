import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { MODAL_IDS } from '@/constants/modal-ids'
import { useStore } from '@/store'

export function LogoutModal() {
  const router = useRouter()
  const closeModal = useStore((state) => state.modal.closeModal)

  const mutation = useMutation({
    mutationFn: () => axios.post('/api/auth/logout'),
  })

  async function handleLogout() {
    await mutation.mutateAsync()
    router.push('/auth/login')
    closeModal(MODAL_IDS.LOGOUT)
  }

  return (
    <DialogContent
      className="flex max-h-full flex-col overflow-y-auto scrollbar-none sm:max-h-[calc(100vh-96px)] sm:max-w-sm"
      closable={!mutation.isPending}
    >
      <DialogHeader>
        <DialogTitle>Sair da conta</DialogTitle>
        <DialogDescription>
          Sua sessão será encerrada e você precisará entrar novamente para acessar.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="flex-row space-x-2">
        <DialogClose asChild>
          <Button
            className="w-full"
            disabled={mutation.isPending}
            type="button"
            variant="secondary"
          >
            Cancelar
          </Button>
        </DialogClose>
        <Button
          className="w-full"
          form="password-verify-form"
          isLoading={mutation.isPending}
          type="button"
          onClick={handleLogout}
        >
          Sair
        </Button>
      </DialogFooter>
    </DialogContent>
  )
}
