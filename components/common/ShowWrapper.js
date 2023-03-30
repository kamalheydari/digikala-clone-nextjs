import { BigLoading, Button } from 'components'

export default function ShowWrapper(props) {
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
      {isError ? (
        <div className='py-20 mx-auto space-y-3 text-center w-fit'>
          <h5 className='text-xl'>خطایی رخ داده</h5>
          <p className='text-lg text-red-500'>{error.data.err}</p>
          <Button className='mx-auto' onClick={refetch}>
            تلاش مجدد
          </Button>
        </div>
      ) : isFetching ? (
        <div className='px-3 py-20'>
          {loadingComponent ? loadingComponent : <BigLoading />}
        </div>
      ) : isSuccess && dataLength > 0 ? (
        <>{children}</>
      ) : isSuccess && dataLength === 0 ? (
        <>{emptyComponent}</>
      ) : null}
    </section>
  )
}
