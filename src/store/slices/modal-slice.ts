import { ReactNode } from 'react'

import { StoreSlice } from '../store'

interface ModalType {
  id: string
  isOpen: boolean
  children: ReactNode
}

interface ModalState {
  modals: ModalType[]
}

interface ModalActions {
  openModal: ({ id, children }: { id: string; children: ReactNode }) => void
  closeModal: (id: string) => void
}

export type ModalSlice = ModalActions & ModalState

export const createModalSlice: StoreSlice<ModalSlice> = (set) => ({
  modals: [],
  openModal: ({ id, children }) =>
    set((state) => {
      state.modal.modals = [...state.modal.modals, { id, children, isOpen: true }]
    }),
  closeModal: (id) => {
    set((state) => {
      state.modal.modals = state.modal.modals.filter((modal) => modal.id !== id)
    })
  },
})
