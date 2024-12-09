'use client'

import { useStore } from '@/store'

import { Dialog } from './dialog'

export function Modal() {
  const modals = useStore((state) => state.modal.modals)
  const closeModal = useStore((state) => state.modal.closeModal)

  return (
    <>
      {modals.map((modal) => (
        <Dialog key={modal.id} open={modal.isOpen} onOpenChange={() => closeModal(modal.id)}>
          {modal.children}
        </Dialog>
      ))}
    </>
  )
}
