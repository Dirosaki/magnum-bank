import { StoreSlice } from '../store'

export interface UserState {
  id: string
  name: string
  email: string
  balance: number
  password: string
}

export type UserSlice = UserState

export const createUserSlice: StoreSlice<UserSlice> = () => ({
  id: '',
  name: '',
  email: '',
  balance: 0,
  password: '',
})
