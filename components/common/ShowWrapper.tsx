import { BigLoading, Button, EmptyCustomList } from 'components'

import { getErrorMessage } from 'utils'

import type { SerializedError } from '@reduxjs/toolkit'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

interface Props {
  isError: boolean
  error?: FetchBaseQueryError | SerializedError
  refetch: () => void
  isFetching: boolean
  dataLength: number
  isSuccess: boolean
  emptyComponent?: React.ReactNode
  loadingComponent?: React.ReactNode
  children: React.ReactNode
}

const ShowWrapper: React.FC<Props> = (props) => {
  //? Porps
  const {
    isError,
    error,
    refetch,
    isFetching,
    dataLength,
    isSuccess,
    emptyComponent,
    loadingComponent,
    children,
  } = props

  //? Render(s)
  return (
    <section>
      {isError && error ? (
        <div className='py-20 mx-auto space-y-3 text-center w-fit'>
          <h5 className='text-xl'>خطایی رخ داده</h5>
          <p className='text-lg text-red-500'>{getErrorMessage(error)}</p>
          <Button className='mx-auto' onClick={refetch}>
            تلاش مجدد
          </Button>
        </div>
      ) : isFetching ? (
        <div className='px-3'>{loadingComponent ?? <BigLoading />}</div>
      ) : isSuccess && dataLength > 0 ? (
        <>{children}</>
      ) : isSuccess && dataLength === 0 ? (
        <>{emptyComponent ?? <EmptyCustomList />}</>
      ) : null}
    </section>
  )
}

export default ShowWrapper
