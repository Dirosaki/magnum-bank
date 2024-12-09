import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { createModalSlice } from './slices/modal-slice'
import { createUserSlice } from './slices/user-slice'
import { Store } from './store'

export const useStore = create<Store>()(
  immer((...params) => ({
    user: createUserSlice(...params),
    modal: createModalSlice(...params),
  }))
)
