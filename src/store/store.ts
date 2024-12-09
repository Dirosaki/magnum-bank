import { StateCreator } from 'zustand'

import { ModalSlice } from './slices/modal-slice'
import { UserSlice } from './slices/user-slice'

export type Store = {
  user: UserSlice
  modal: ModalSlice
}

export type StoreSlice<TSlice> = StateCreator<Store, [['zustand/immer', never]], [], TSlice>
