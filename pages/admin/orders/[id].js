import Head from "next/head";
import { useRouter } from "next/router";

import { useGetSingleOrderQuery } from "app/api/orderApi";

import { Buttons, OrderCard, ShowWrapper } from "components";

export default function SingleOrder() {
  const router = useRouter();

  //? Get Order Query
  const {
    data,
    isError,
    error,
    isFetching,
    refetch,
    isSuccess,
  } = useGetSingleOrderQuery({
    id: router.query.id,
  });

  return (
    <main>
      <Head>
        <title>مدیریت | سفارش</title>
      </Head>
      <Buttons.Back backRoute='/admin/orders'>سفارشات</Buttons.Back>
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
          <OrderCard singleOrder order={data?.order} />
        </section>
      </ShowWrapper>
    </main>
  );
}

SingleOrder.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
