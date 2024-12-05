import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Magnum Bank',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <head>
        <link href="/logo-magnum.png" rel="icon" sizes="192x192" />
      </head>
      <html className="dark" lang="pt-BR" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </>
  )
}
