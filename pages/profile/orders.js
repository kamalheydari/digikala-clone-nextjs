import Head from "next/head";
import { useState } from "react";

import { useSelector } from "react-redux";

import {
  Buttons,
  OrderCard,
  Pagination,
  ShowWrapper,
  EmptyOrdersList,
} from "components";
import { useGetOrdersQuery } from "app/api/orderApi";

export default function Orders() {
  //? Local State
  const [page, setPage] = useState(1);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Get Orders Query
  const {
    data,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetOrdersQuery({
    pageSize: 5,
    page,
    token,
  });

  return (
    <main>
      <Head>
        <title>پروفایل | تاریخچه سفارشات</title>
      </Head>
      <Buttons.Back backRoute='/profile'>تاریخچه سفارشات</Buttons.Back>
      <div className='section-divide-y' />
      <ShowWrapper
        error={error}
        isError={isError}
        refetch={refetch}
        isFetching={isFetching}
        isSuccess={isSuccess}
        dataLength={data ? data.ordersLength : 0}
        emptyElement={<EmptyOrdersList />}
        page={page}
        top
      >
        <div className='px-4 py-3 space-y-3'>
          {data?.orders.map((item) => (
            <OrderCard key={item._id} order={item} />
          ))}
        </div>
      </ShowWrapper>

      {data?.ordersLength > 5 && (
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
Orders.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
