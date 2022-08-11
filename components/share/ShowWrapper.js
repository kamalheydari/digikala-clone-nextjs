import { BigLoading } from "components";
import { useEffect, useRef } from "react";

export default function ShowWrapper({
  isError,
  error,
  refetch,
  isFetching,
  dataLength,
  isSuccess,
  emptyElement,
  children,
  page,
  top,
}) {
  //? Ref
  const wrapperRef = useRef(null);

  //? Scroll to top
  useEffect(() => {
    if (isSuccess && window.scrollY > 200) {
      if (top) {
        window.scrollTo(0, 0);
      } else {
        const wrapperHeight = () => wrapperRef.current.scrollIntoView();
        wrapperHeight();
      }
    }
  }, [page, isSuccess]);

  return (
    <section ref={wrapperRef}>
      {isError ? (
        <div className='py-20 mx-auto space-y-3 text-center w-fit'>
          <h5 className='text-xl'>خطایی رخ داده</h5>
          <p className='text-lg text-red-500'>{error.data.err}</p>
          <button className='mx-auto btn' onClick={refetch}>
            تلاش مجدد
          </button>
        </div>
      ) : isFetching && !isSuccess ? (
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
