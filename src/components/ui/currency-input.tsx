import React, { ComponentProps, forwardRef } from 'react'

import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/utils/formatCurrency'

interface CurrencyInputProps extends Omit<ComponentProps<typeof Input>, 'onChange'> {
  value?: number
  onChange: (value: number) => void
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, onChange, ...props }, ref) => {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const numericValue = Number(event.target.value.replace(/\D/g, '')) / 100

      onChange(numericValue)
    }

    return (
      <Input
        ref={ref}
        inputMode="numeric"
        type="text"
        value={formatCurrency(value ?? 0)}
        onChange={handleChange}
        {...props}
      />
    )
  }
)

CurrencyInput.displayName = 'CurrencyInput'
