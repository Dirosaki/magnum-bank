'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { formatTransactionList, ITransactionResponse } from '@/models/transactions'
import { errorHandler } from '@/utils/errorHandler'

import Transaction from './transaction'

interface TransactionListResponse {
  transactions: ITransactionResponse[]
}

export function TransactionList() {
  const query = useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data } = await axios.get<TransactionListResponse>('/api/transactions')
      return formatTransactionList(data.transactions)
    },
  })

  if (query.error) {
    errorHandler(query.error)
  }

  return (
    <ul className="divide-y">
      {query.data?.map((transaction) => <Transaction key={transaction.id} data={transaction} />)}
    </ul>
  )
}
