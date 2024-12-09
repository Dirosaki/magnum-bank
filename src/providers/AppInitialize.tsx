'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import { useStore } from '@/store'
import { UserState } from '@/store/slices/user-slice'

interface AppInitializeProps {
  children: React.ReactNode
  user: UserState
}

export default function AppInitialize({ user, children }: AppInitializeProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
  )
  useStore.setState({ user })

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
