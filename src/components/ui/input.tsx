import * as React from 'react'

import { cn } from '@/utils/cn'

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground
        ring-offset-background transition-shadow placeholder:text-muted-foreground/80
        focus-visible:border-foreground focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-foreground/20 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
