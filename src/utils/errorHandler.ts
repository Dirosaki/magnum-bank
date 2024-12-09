import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { API_ERRORS } from '@/errors/api-errors'

interface AxiosErrorData {
  error: string
  message: string
}

export function errorHandler(error: unknown) {
  if (isAxiosError<AxiosErrorData>(error) && typeof error.response?.data.error === 'string') {
    const errorMessage = API_ERRORS[error.response.data.error]
    return toast.error(errorMessage)
  }

  return toast.error('Erro interno do servidor')
}
