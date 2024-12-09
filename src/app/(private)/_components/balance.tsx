'use client'

import { EyeClosed, EyeIcon } from 'lucide-react'

import { useToggle } from '@/hooks/useToggle'
import { useStore } from '@/store'
import { formatCurrency } from '@/utils/formatCurrency'

export default function Balance() {
  const [isValueVisible, toggleValueVisibility] = useToggle(true)
  const balance = useStore((state) => state.user.balance)

  return (
    <div className="w-full space-y-2 rounded-lg bg-card p-6">
      <span className="text-muted-foreground">Saldo total</span>

      <div className="flex items-center">
        {isValueVisible && <strong className="text-2xl">{formatCurrency(balance)}</strong>}
        {!isValueVisible && <strong className="text-2xl">•••••</strong>}

        <button
          className="ml-auto flex size-8 items-center justify-center"
          type="button"
          onClick={toggleValueVisibility}
        >
          {isValueVisible && <EyeClosed size={20} />}
          {!isValueVisible && <EyeIcon size={20} />}
        </button>
      </div>
    </div>
  )
}
