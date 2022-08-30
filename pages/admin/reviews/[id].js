import Head from "next/head";
import { useRouter } from "next/router";

import { useGetSingleReviewQuery } from "app/api/reviewApi";

import { Buttons, ReveiwCard, ShowWrapper } from "components";

export default function SingleComment() {
  const router = useRouter();

  //? Get Single Review Query
  const {
    data,
    isError,
    error,
    isFetching,
    refetch,
    isSuccess,
  } = useGetSingleReviewQuery({
    id: router.query.id,
  });

  return (
    <main>
      <Head>
        <title>مدیریت | دیدگاه‌</title>
      </Head>
      <Buttons.Back backRoute='/admin/reviews'>دیدگاه</Buttons.Back>
      <div className='section-divide-y' />
      <ShowWrapper
        error={error}
        isError={isError}
        refetch={refetch}
        isFetching={isFetching}
        isSuccess={isSuccess}
        dataLength={data ? 1 : 0}
        emptyElement={null}
      >
        <section className='max-w-5xl px-3 py-3 mx-auto lg:px-8'>
          <ReveiwCard singleComment item={data?.review} />
        </section>
      </ShowWrapper>
    </main>
  );
}

SingleComment.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
