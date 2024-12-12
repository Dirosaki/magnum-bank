'use client'

import { Button } from '@/components/ui/button'
import { useStore } from '@/store'

import TransferModal from './transfer-modal'

export function TransferButtons() {
  const openModal = useStore((state) => state.modal.openModal)

  function handleOpenTransferModal(type: 'PIX' | 'TED') {
    openModal({ id: 'transfer-modal', children: <TransferModal type={type} /> })
  }

  return (
    <div className="!mt-3 flex items-center gap-2">
      <Button className="w-full" variant="secondary" onClick={() => handleOpenTransferModal('PIX')}>
        PIX
      </Button>

      <Button className="w-full" variant="secondary" onClick={() => handleOpenTransferModal('TED')}>
        TED
      </Button>
    </div>
  )
}
