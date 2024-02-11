import { getErrorMessage } from '@/utils'

import { EmptyCustomList } from '@/components/emptyList'
import { Button, FullScreenLoading } from '@/components/ui'

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

const DataStateDisplay: React.FC<Props> = (props) => {
  // ? Porps
  const {
    isError,
    error,
    refetch,
    isFetching,
    dataLength,
    isSuccess,
    emptyComponent = <EmptyCustomList />,
    loadingComponent = <FullScreenLoading />,
    children,
  } = props

  // ? Render(s)
  return (
    <section>
      {isError && error ? (
        <div className="mx-auto w-fit space-y-3 py-20 text-center">
          <h5 className="text-xl">خطایی رخ داده</h5>
          <p className="text-lg text-red-500">{getErrorMessage(error)}</p>
          <Button className="mx-auto" onClick={refetch}>
            تلاش مجدد
          </Button>
        </div>
      ) : isFetching ? (
        <div className="px-3">{loadingComponent}</div>
      ) : isSuccess && dataLength > 0 ? (
        <>{children}</>
      ) : isSuccess && dataLength === 0 ? (
        <>{emptyComponent}</>
      ) : null}
    </section>
  )
}

export default DataStateDisplay
