import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@/utils/cn'

type FormFieldProps = ComponentPropsWithoutRef<'div'>

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('group/form-field w-full space-y-2', className)} {...props} />
  )
)
FormField.displayName = 'FormField'
