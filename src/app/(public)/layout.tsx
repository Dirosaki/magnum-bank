import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { auth } from '@/lib/auth'

export default async function PublicLayout({ children }: { children: ReactNode }) {
  const user = await auth()

  if (user) {
    return redirect('/')
  }

  return children
}
