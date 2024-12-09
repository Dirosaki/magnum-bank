'use client'

import axios from 'axios'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'

export default function Header() {
  const router = useRouter()

  async function handleLogout() {
    await axios.post('/api/auth/logout')
    router.push('/auth/login')
  }

  return (
    <header className="flex items-center gap-2 p-6">
      <Image alt="Logo da Magnum" height={48} src="/logo-magnum.png" width={48} />

      <Button
        aria-label="Sair da conta"
        className="ml-auto"
        size="icon"
        variant="ghost"
        onClick={handleLogout}
      >
        <LogOut size={16} />
      </Button>
    </header>
  )
}
