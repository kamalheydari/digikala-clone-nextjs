import { useState } from "react";

import { useDispatch } from "react-redux";
import { useGetDataQuery } from "app/slices/fetchApi.slice";
import { openModal } from "app/slices/modal.slice";

import { Pagination, Icons, ShowWrapper, EmptyComment } from "components";

import moment from "moment-jalaali";

export default function Reviews({ numReviews, prdouctID, productTitle }) {
  const dispatch = useDispatch();

  //? Local State
  const [reviewsPage, setReviewsPage] = useState(1);

  //? Get Query
  const {
    data,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetDataQuery({
    url: `/api/reviews/product/${prdouctID}?page=${reviewsPage}&page_size=5`,
  });

  const handleOpenCommentModal = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "comment",
        title: productTitle,
        id: prdouctID,
      })
    );
  };

  return (
    <section className='px-3 py-3 space-y-4 lg:max-w-3xl xl:max-w-5xl'>
      <div className='flex items-center justify-between'>
        <h4 className='mb-3 lg:border-b-2 lg:border-red-500'>دیدگاه‌ها</h4>
        <span className='text-xs text-sky-500 farsi-digits'>
          {numReviews} دیدگاه
        </span>
      </div>
      <div className='lg:mr-36'>
        <div className='mb-8'>
          <button
            type='button'
            onClick={handleOpenCommentModal}
            className='flex items-center w-full gap-x-5'
          >
            <Icons.Comment className='icon' />
            <span className='text-sm text-black '>
              دیدگاه خود را درباره این کالا بنویسید
            </span>
            <Icons.ArrowLeft className='mr-auto icon' />
          </button>
          <p className='mt-6 text-xs text-gray-500'>
            پس از تایید نظر، با مراجعه به صفحه‌ی ماموریت‌های کلابی امتیاز خود را
            دریافت کنید.
          </p>
        </div>
        <ShowWrapper
          error={error}
          isError={isError}
          refetch={refetch}
          isFetching={isFetching}
          isSuccess={isSuccess}
          dataLength={data ? data.reviewsLength : 0}
          page={reviewsPage}
          emptyElement={<EmptyComment />}
        >
          <div className='py-3 space-y-4 divide-y-2 lg:px-6 sm:px-2'>
            {data?.reviews.map((item) => (
              <div className='flex py-3' key={item._id}>
                <div>
                  <span
                    className={`farsi-digits w-5 h-5 text-center pt-0.5 inline-block rounded-md text-white  ${
                      item.rating <= 2
                        ? "bg-red-500"
                        : item.rating === 3
                        ? "bg-amber-500"
                        : "bg-green-500"
                    }`}
                  >
                    {item.rating}
                  </span>
                </div>
                <div className='flex-1 px-2.5 space-y-3 lg:px-6'>
                  <div className='w-full border-b border-gray-100'>
                    <p className='mb-1'>{item.title}</p>
                    <span className='text-xs farsi-digits'>
                      {moment(item.updatedAt).format("jYYYY/jM/jD")}
                    </span>
                    <span className='inline-block w-1 h-1 mx-3 bg-gray-400 rounded-full' />
                    <span className='text-xs'>{item.user.name}</span>
                  </div>

                  <p>{item.comment}</p>

                  {item.positivePoints.length > 0 && (
                    <div>
                      {item.positivePoints.map((point) => (
                        <div
                          className='flex items-center gap-x-1'
                          key={point.id}
                        >
                          <Icons.Plus className='text-green-400 icon' />
                          <p>{point.title}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.positivePoints.length > 0 && (
                    <div>
                      {item.negativePoints.map((point) => (
                        <div
                          className='flex items-center gap-x-1'
                          key={point.id}
                        >
                          <Icons.Minus className='text-red-400 icon' />
                          <p>{point.title}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ShowWrapper>

        {data?.reviewsLength > 5 && (
          <div className='py-4 mx-auto lg:max-w-5xl'>
            <Pagination
              currentPage={data.currentPage}
              nextPage={data.nextPage}
              previousPage={data.previousPage}
              hasNextPage={data.hasNextPage}
              hasPreviousPage={data.hasPreviousPage}
              lastPage={data.lastPage}
              setPage={setReviewsPage}
            />
          </div>
        )}
      </div>
    </section>
  );
}
