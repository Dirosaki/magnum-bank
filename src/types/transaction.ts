export interface IRecipient {
  name: string
  email: string
  bank: string
  agency: string
  account: string
  pixKey: string
}

export interface ITransaction {
  id: string
  type: 'PIX' | 'TED'
  direction: 'RECEIVED' | 'SENT'
  amount: number
  createdAt: string
  recipient: IRecipient
}
