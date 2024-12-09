export interface ITransactionResponse {
  id: string
  type: 'PIX' | 'TED'
  direction: 'RECEIVED' | 'SENT'
  amount: number
  createdAt: string
  document: string
  email: string
  name: string
  bank: string
  agency: string
  account: string
  pixKey: string
}

export interface ITransactionFormatted {
  id: string
  type: 'PIX' | 'TED'
  direction: 'RECEIVED' | 'SENT'
  amount: number
  createdAt: string
  recipient: {
    document: string
    email: string
    name: string
    bank: string
    agency: string
    account: string
    pixKey: string
  }
}

export function formatTransaction(transaction: ITransactionResponse) {
  return {
    id: transaction.id,
    type: transaction.type,
    direction: transaction.direction,
    amount: transaction.amount,
    createdAt: transaction.createdAt,
    recipient: {
      document: transaction.document,
      email: transaction.email,
      name: transaction.name,
      bank: transaction.bank,
      agency: transaction.agency,
      account: transaction.account,
      pixKey: transaction.pixKey,
    },
  }
}

export function formatTransactionList(transactions: ITransactionResponse[]) {
  return transactions.map(formatTransaction)
}
