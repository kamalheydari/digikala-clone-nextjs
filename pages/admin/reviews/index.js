import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useGetReviewsQuery } from "app/api/reviewApi";
import { useSelector } from "react-redux";

import {
  Buttons,
  Pagination,
  ShowWrapper,
  EmptyCommentsList,
} from "components";

export default function Reviews() {
  //? Local State
  const [page, setPage] = useState(1);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Get Review Query
  const {
    data,
    isError,
    error,
    isFetching,
    refetch,
    isSuccess,
  } = useGetReviewsQuery({
    page,
    token,
  });

  return (
    <main id='adminReviews'>
      <Head>
        <title>مدیریت | دیدگاه‌ها</title>
      </Head>
      <Buttons.Back backRoute='/admin'>دیدگاه‌ها</Buttons.Back>
      <div className='section-divide-y' />

      <ShowWrapper
        error={error}
        isError={isError}
        refetch={refetch}
        isFetching={isFetching}
        isSuccess={isSuccess}
        dataLength={data ? data.reviewsLength : 0}
        emptyElement={<EmptyCommentsList />}
      >
        <section className='mx-3 overflow-x-auto mt-7 lg:mx-10'>
          <table className='w-full whitespace-nowrap'>
            <thead className='h-9 bg-emerald-50'>
              <tr className='text-emerald-500'>
                <th></th>
                <th className='border-gray-100 border-x-2'>ID</th>
                <th>وضعیت</th>
                <th className='border-gray-100 border-x-2'>نام</th>
                <th>تغییر وضعیت</th>
              </tr>
            </thead>
            <tbody className='text-gray-600'>
              {data?.reviews.map((review) => (
                <tr
                  className='text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50'
                  key={review._id}
                >
                  <td className='p-2'>
                    <div className='relative mx-auto w-7 h-7'>
                      <Image
                        src={review.product.images[0].url}
                        layout='fill'
                        alt='تصویر محصول'
                        placeholder='blur'
                        blurDataURL='/placeholder.png'
                      />
                    </div>
                  </td>
                  <td className='p-2'>{review._id}</td>
                  <td className='p-2 font-bold'>
                    <span
                      className={`py-1.5 px-2 rounded-lg font-bold inline-block
                      ${
                        review.status === 1
                          ? "bg-amber-100 text-amber-500 "
                          : review.status === 2
                          ? "bg-green-100 text-green-500 "
                          : "bg-red-100 text-red-500 "
                      }
                    `}
                    >
                      {review.status === 1
                        ? "در انتظار تایید"
                        : review.status === 2
                        ? "تایید شده"
                        : "رد شده"}
                    </span>
                  </td>
                  <td className='p-2'>{review.user.name}</td>

                  <td className='p-2'>
                    <Link href={`/admin/reviews/${review._id}`}>
                      <a>
                        <Buttons.Edit />
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data?.reviewsLength > 10 && (
            <div className='py-4 mx-auto lg:max-w-5xl'>
              <Pagination
                currentPage={data.currentPage}
                nextPage={data.nextPage}
                previousPage={data.previousPage}
                hasNextPage={data.hasNextPage}
                hasPreviousPage={data.hasPreviousPage}
                lastPage={data.lastPage}
                setPage={setPage}
                section='adminReviews'
              />
            </div>
          )}
        </section>
      </ShowWrapper>
    </main>
  );
}

Reviews.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
