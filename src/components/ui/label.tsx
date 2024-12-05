'use client'

import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@/utils/cn'

const Label = forwardRef<HTMLLabelElement, ComponentPropsWithoutRef<'label'>>(
  ({ className, htmlFor, ...props }, ref) => (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(
        `text-sm font-medium leading-4 text-foreground peer-disabled:cursor-not-allowed
        peer-disabled:opacity-50 group-has-[input:disabled]/form-field:cursor-not-allowed
        group-has-[input:disabled]/form-field:opacity-50`,
        className
      )}
      {...props}
    />
  )
)
Label.displayName = 'Label'

export { Label }
