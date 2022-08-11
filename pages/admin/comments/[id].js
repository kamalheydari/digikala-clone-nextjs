import Head from "next/head";
import { useRouter } from "next/router";

import { useGetDataQuery } from "app/slices/fetchApi.slice";

import {
  Buttons,
  ReveiwCard,
  ShowWrapper,
} from "components";

export default function SingleComment() {
  const router = useRouter();

  const {
    data,
    isError,
    error,
    isFetching,
    refetch,
    isSuccess,
  } = useGetDataQuery({
    url: `/api/reviews/${router.query.id}`,
  });

  return (
    <main>
      <Head>
        <title>مدیریت | دیدگاه‌</title>
      </Head>
      <Buttons.Back backRoute='/admin/comments'>دیدگاه</Buttons.Back>
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
