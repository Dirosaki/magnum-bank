import { format, isToday, isYesterday } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'

export function formatTransactionDate(date: Date | string) {
  const dateToFormat = typeof date === 'string' ? new Date(date) : date
  const timeString = format(dateToFormat, "HH'h'mm", { locale: ptBR })

  if (isToday(dateToFormat)) {
    return `Hoje - ${timeString}`
  }

  if (isYesterday(dateToFormat)) {
    return `Ontem - ${timeString}`
  }

  const formattedDate = format(dateToFormat, 'dd/MM', { locale: ptBR })
  return `${formattedDate} - ${timeString}`
}
