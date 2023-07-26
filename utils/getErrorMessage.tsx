import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import type { SerializedError } from '@reduxjs/toolkit'

interface CustomError {
  status: number
  data: string
}

const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
): string =>
  error && 'status' in error && 'data' in error
    ? (error as CustomError).data
    : ''

export default getErrorMessage
