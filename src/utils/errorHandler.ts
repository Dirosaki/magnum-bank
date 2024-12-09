import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { API_ERRORS } from '@/errors/api-errors'

interface AxiosErrorData {
  error: string
  message: string
}

export function errorHandler(err: unknown) {
  if (isAxiosError<AxiosErrorData>(err) && typeof err.response?.data.error === 'string') {
    const { error } = err.response.data

    if (error === 'ZOD_ERROR') {
      return toast.error('Erro de validação')
    }

    const message = API_ERRORS[error] ?? 'Erro desconhecido.'
    return toast.error(message)
  }

  return toast.error('Erro interno do servidor')
}
