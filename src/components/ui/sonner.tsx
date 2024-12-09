'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

import { useMediaQuery } from '@/hooks/use-media-query'

type ToasterProps = React.ComponentProps<typeof Sonner>

function Toaster({ ...props }: ToasterProps) {
  const { theme = 'system' } = useTheme()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <Sonner
      className="toaster group"
      position={isDesktop ? 'bottom-center' : 'top-center'}
      theme={theme as ToasterProps['theme']}
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }