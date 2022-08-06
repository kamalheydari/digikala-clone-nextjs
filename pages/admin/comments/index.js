import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useGetDataQuery } from "app/slices/fetchApi.slice";
import { useSelector } from "react-redux";

import { BigLoading, Buttons, Pagination } from "components";

export default function Comments() {
  //? Local State
  const [page, setPage] = useState(1);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Get Query
  const { data, isLoading } = useGetDataQuery({
    url: `/api/reviews?page=${page}&page_size=10`,
    token,
  });

  return (
    <main>
      <Buttons.Back backRoute='/admin'>دیدگاه‌ها</Buttons.Back>
      <div className='section-divide-y' />

      {isLoading ? (
        <section className='px-3 py-20'>
          <BigLoading />
        </section>
      ) : data.reviewsLength === 0 ? (
        <section className='py-20'>
          <div className='relative mx-auto h-52 w-52'>
            <Image src='/ico`ns/order-empty.svg' layout='fill' />
          </div>

          <p className='text-center'>هنوز هیچ نظری ندارید</p>
        </section>
      ) : (
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
              {data.reviews.map((review) => (
                <tr
                  className='text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50'
                  key={review._id}
                >
                  <td className='p-2'>
                    <div className='relative mx-auto w-7 h-7'>
                      <Image src={review.product.images[0].url} layout='fill' />
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
                    <Link href={`/admin/comments/${review._id}`}>
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
              />
            </div>
          )}
        </section>
      )}
    </main>
  );
}

Comments.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
