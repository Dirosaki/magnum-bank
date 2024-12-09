import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { Modal } from '@/components/ui/modal'
import { auth } from '@/lib/auth'
import AppInitialize from '@/providers/AppInitialize'

export default async function PrivateLayout({ children }: { children: ReactNode }) {
  const user = await auth()

  if (!user) {
    return redirect('/auth/login')
  }

  return (
    <AppInitialize user={user}>
      {children} <Modal />
    </AppInitialize>
  )
}
