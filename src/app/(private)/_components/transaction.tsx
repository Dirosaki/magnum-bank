import { ITransaction } from '@/types/transaction'
import { cn } from '@/utils/cn'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatTransactionDate } from '@/utils/formatTransactionDate'

type TransactionProps = {
  data: ITransaction
}

const transactionType = {
  TED: 'TED',
  PIX: 'Pix',
}

const transactionDirection = {
  RECEIVED: 'recebido',
  SENT: 'enviado',
}

export default function Transaction({ data }: TransactionProps) {
  return (
    <li className="flex flex-col py-4 last-of-type:pb-0">
      <span className="text-sm font-semibold">
        {transactionType[data.type]} {transactionDirection[data.direction]}
      </span>
      <p className="truncate text-sm text-muted-foreground">{data.recipient.name}</p>

      <div className="mt-2 flex items-center gap-3">
        <strong
          className={cn(
            'text-sm font-semibold',
            data.direction === 'RECEIVED' && 'text-emerald-400'
          )}
        >
          {formatCurrency(data.amount)}
        </strong>
        <span className="ml-auto text-sm text-muted-foreground">
          {formatTransactionDate(data.createdAt)}
        </span>
      </div>
    </li>
  )
}
