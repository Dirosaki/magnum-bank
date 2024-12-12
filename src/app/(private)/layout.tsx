import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { Header } from '@/components/header'
import { Modal } from '@/components/ui/modal'
import { auth } from '@/lib/auth'
import { AppInitialize } from '@/providers/AppInitialize'

export default async function PrivateLayout({ children }: { children: ReactNode }) {
  const user = await auth()

  if (!user) {
    return redirect('/auth/login')
  }

  return (
    <AppInitialize user={user}>
      <div className="flex-1 bg-gradient-to-b from-black to-card">
        <Header />

        {children}
      </div>
      <Modal />
    </AppInitialize>
  )
}
