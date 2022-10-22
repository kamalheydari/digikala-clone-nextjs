import { BigLoading } from "components";

export default function ShowWrapper({
  isError,
  error,
  refetch,
  isFetching,
  dataLength,
  isSuccess,
  emptyElement,
  children,
}) {
  return (
    <section>
      {isError ? (
        <div className='py-20 mx-auto space-y-3 text-center w-fit'>
          <h5 className='text-xl'>خطایی رخ داده</h5>
          <p className='text-lg text-red-500'>{error.data.err}</p>
          <button className='mx-auto btn' onClick={refetch}>
            تلاش مجدد
          </button>
        </div>
      ) : isFetching ? (
        <div className='px-3 py-20'>
          <BigLoading />
        </div>
      ) : isSuccess && dataLength > 0 ? (
        <>{children}</>
      ) : isSuccess && dataLength === 0 ? (
        <>{emptyElement}</>
      ) : null}
    </section>
  );
}
