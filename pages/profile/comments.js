import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useGetDataQuery } from "app/slices/fetchApi.slice";

import { BigLoading, Buttons, Pagination, ReveiwCard } from "components";

export default function Comments() {
  //? Local State
  const [page, setPage] = useState(1);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Get Query
  const { data, isLoading, isSuccess } = useGetDataQuery({
    url: `/api/reviews?page=${page}&page_size=5`,
    token,
  });

  return (
    <main>
      <Head>
        <title>دیجی‌کالا | دیدگاه‌ها</title>
      </Head>
      <Buttons.Back backRoute='/profile'>دیدگاه‌ها</Buttons.Back>
      <div className='section-divide-y' />
      {isLoading ? (
        <section className='px-3 py-20'>
          <BigLoading />
        </section>
      ) : data.reviewsLength === 0 ? (
        <section className='py-20'>
          <div className='relative mx-auto h-52 w-52'>
            <Image src='/icons/order-empty.svg' layout='fill' />
          </div>

          <p className='text-center'>هنوز هیچ نظری ندارید</p>
        </section>
      ) : (
        <section className='px-4 py-3 space-y-3 '>
          {data.reviews.map((item) => (
            <ReveiwCard key={item._id} item={item} />
          ))}
        </section>
      )}

      {data?.reviewsLength > 5 && (
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
    </main>
  );
}
Comments.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
