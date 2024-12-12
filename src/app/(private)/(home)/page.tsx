import { Balance } from './_components/balance'
import { TransactionList } from './_components/transaction-list'
import { TransferButtons } from './_components/transfer-buttons'

export default function Home() {
  return (
    <main className="p-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <Balance />
        <div className="w-full space-y-2 rounded-lg bg-card p-6">
          <span className="text-muted-foreground">Realizar transferência</span>

          <TransferButtons />
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-card p-6">
        <strong>Transações</strong>
        <TransactionList />
      </div>
    </main>
  )
}
