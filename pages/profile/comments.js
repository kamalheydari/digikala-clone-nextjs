import Head from "next/head";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useGetDataQuery } from "app/slices/fetchApi.slice";

import {
  Buttons,
  Pagination,
  ReveiwCard,
  ShowWrapper,
  EmptyCommentsList,
} from "components";

export default function Comments() {
  //? Local State
  const [page, setPage] = useState(1);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Get Query
  const {
    data,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetDataQuery({
    url: `/api/reviews?page=${page}&page_size=5`,
    token,
  });

  return (
    <main>
      <Head>
        <title>پروفایل | دیدگاه‌ها</title>
      </Head>
      <Buttons.Back backRoute='/profile'>دیدگاه‌ها</Buttons.Back>
      <div className='section-divide-y' />

      <ShowWrapper
        error={error}
        isError={isError}
        refetch={refetch}
        isFetching={isFetching}
        isSuccess={isSuccess}
        dataLength={data ? data.reviewsLength : 0}
        page={page}
        emptyElement={<EmptyCommentsList />}
        top
      >
        <div className='px-4 py-3 space-y-3 '>
          {data?.reviews.map((item) => (
            <ReveiwCard key={item._id} item={item} />
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