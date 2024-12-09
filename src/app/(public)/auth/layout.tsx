import Image from 'next/image'
import { ReactNode } from 'react'

import { Wave } from '@/assets/elements/wave'
import { Card } from '@/components/ui/card'

export default async function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-1 bg-gradient-to-t from-black to-card p-4">
      <Card className="relative m-auto w-full max-w-md overflow-hidden border-none">
        <Wave className="absolute -right-16 -top-16 size-44 text-primary" />
        <Image
          alt="Logo da Magnum"
          className="-mb-6 ml-6 mt-6 select-none"
          height={48}
          src="/logo-magnum.png"
          width={48}
        />

        {children}
      </Card>
    </main>
  )
}
