'use client'

import { Eye, EyeOff } from 'lucide-react'
import { ComponentProps, forwardRef } from 'react'

import { Input } from '@/components/ui/input'
import { useToggle } from '@/hooks/useToggle'
import { cn } from '@/utils/cn'

interface PasswordInputProps extends ComponentProps<typeof Input> {
  classNameContainer?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ classNameContainer, className, id, ...props }, ref) => {
    const [isVisible, toggleVisibility] = useToggle(false)

    return (
      <div className={cn('relative w-full', classNameContainer)}>
        <Input
          ref={ref}
          className={cn('peer pr-10', className)}
          id={id}
          type={isVisible ? 'text' : 'password'}
          {...props}
        />

        <button
          aria-controls={id}
          aria-label={isVisible ? 'Esconder senha' : 'Mostrar senha'}
          aria-pressed={isVisible}
          type="button"
          className="absolute inset-y-0 end-0 flex h-full w-10 items-center justify-center rounded-e-lg border
            border-transparent text-muted-foreground/80 outline-none transition-[color] hover:text-foreground
            focus:z-10 focus-visible:border-foreground focus-visible:outline-none focus-visible:ring
            focus-visible:ring-foreground/20 disabled:pointer-events-none disabled:cursor-not-allowed
            disabled:opacity-50 peer-placeholder-shown:hidden"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeOff aria-hidden="true" size={16} strokeWidth={2} />
          ) : (
            <Eye aria-hidden="true" size={16} strokeWidth={2} />
          )}
        </button>
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
