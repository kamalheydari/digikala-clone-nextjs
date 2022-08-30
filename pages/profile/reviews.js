import Head from "next/head";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useDeleteReviewMutation, useGetReviewsQuery } from "app/api/reviewApi";

import {
  Buttons,
  Pagination,
  ReveiwCard,
  ShowWrapper,
  EmptyCommentsList,
  HandleDelete,
} from "components";

export default function Reviews() {
  //? Local State
  const [page, setPage] = useState(1);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Delete Review Query
  const [
    deleteReview,
    {
      isSuccess: isSuccess_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
    },
  ] = useDeleteReviewMutation();

  //? Get Reviews Query
  const {
    data,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetReviewsQuery({
    page,
    token,
  });

  return (
    <main>
      <Head>
        <title>پروفایل | دیدگاه‌ها</title>
      </Head>

      <HandleDelete
        deleteFunc={deleteReview}
        isSuccess={isSuccess_delete}
        isError={isError_delete}
        error={error_delete}
        data={data_delete}
      />

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
Reviews.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};