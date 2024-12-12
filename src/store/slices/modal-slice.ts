import { ReactElement } from 'react'

import { MODAL_IDS } from '@/constants/modal-ids'

import { StoreSlice } from '../store'

interface ModalType {
  id: MODAL_IDS
  isOpen: boolean
  children: ReactElement
}

interface ModalState {
  modals: ModalType[]
}

interface ModalActions {
  openModal: ({ id, children }: Pick<ModalType, 'children' | 'id'>) => void
  closeModal: (id: MODAL_IDS) => void
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
