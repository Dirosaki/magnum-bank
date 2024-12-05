import NextLink from 'next/link'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/utils/cn'

export const Link = forwardRef<
  ElementRef<typeof NextLink>,
  ComponentPropsWithoutRef<typeof NextLink>
>(({ className, ...props }, ref) => (
  <NextLink
    ref={ref}
    className={cn(
      'font-medium text-foreground underline underline-offset-4 transition-colors hover:text-foreground/90',
      className
    )}
    {...props}
  />
))
Link.displayName = 'Link'
