'use client'

import { LogOut } from 'lucide-react'
import Image from 'next/image'

import { LogoutModal } from '@/components/modals/logout-modal'
import { Button } from '@/components/ui/button'
import { useStore } from '@/store'

export function Header() {
  const openModal = useStore((state) => state.modal.openModal)

  function handleOpenLogoutModal() {
    openModal({
      id: 'logout-modal',
      children: <LogoutModal />,
    })
  }

  return (
    <header className="flex items-center gap-2 p-6">
      <Image alt="Logo da Magnum" height={48} src="/logo-magnum.png" width={48} />

      <Button
        aria-label="Sair da conta"
        className="ml-auto"
        size="icon"
        variant="ghost"
        onClick={handleOpenLogoutModal}
      >
        <LogOut size={16} />
      </Button>
    </header>
  )
}
