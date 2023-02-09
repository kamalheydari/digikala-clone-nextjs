import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

import { useGetOrdersQuery } from "app/api/orderApi";

import { Buttons, Pagination, ShowWrapper, EmptyOrdersList, PageContainer } from "components";

export default function OrdersHome() {
  //? Local State
  const [page, setPage] = useState(1);

  //? Get Orders Query
  const {
    data,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetOrdersQuery({
    page,
    pageSize: 5,
  });

  return (
    <main id='adminOrders'>
      <Head>
        <title>مدیریت | سفارشات</title>
      </Head>
      <PageContainer title='سفارشات'>

      <section className='p-3 md:px-3 xl:px-8 2xl:px-10' id='orders'>
        <ShowWrapper
          error={error}
          isError={isError}
          refetch={refetch}
          isFetching={isFetching}
          isSuccess={isSuccess}
          dataLength={data ? data.ordersLength : 0}
          emptyElement={<EmptyOrdersList />}
        >
          <div className='overflow-x-auto mt-7'>
            <table className='w-full whitespace-nowrap'>
              <thead className='h-9 bg-emerald-50'>
                <tr className='text-emerald-500'>
                  <th className='border-gray-100 border-x-2'>ID</th>
                  <th>نام گیرنده</th>
                  <th>وضعیت</th>
                  <th className='border-gray-100 border-x-2'>ایمیل</th>
                  <th>تغییر وضعیت</th>
                </tr>
              </thead>
              <tbody className='text-gray-600'>
                {data?.orders.map((order) => (
                  <tr
                    className='text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50'
                    key={order._id}
                  >
                    <td className='py-3 px-1.5'>{order._id}</td>
                    <td className='py-3 px-1.5'>{order.user.name}</td>
                    <td className='py-3 px-1.5'>
                      {order.delivered ? (
                        <span className='inline-block p-1 text-green-600 rounded-md bg-green-50'>
                          تحویل داده شده
                        </span>
                      ) : (
                        <span className='p-1 rounded-md text-amber-600 bg-amber-50'>
                          در حال پردازش
                        </span>
                      )}
                    </td>
                    <td className='py-3 px-1.5'>{order.user.email}</td>
                    <td className='p-2'>
                      <Link href={`/admin/orders/${order._id}`}>
                        <a>
                          <Buttons.Edit />
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ShowWrapper>

        {data?.ordersLength > 10 && (
          <div className='py-4 mx-auto lg:max-w-5xl'>
            <Pagination
              currentPage={data.currentPage}
              nextPage={data.nextPage}
              previousPage={data.previousPage}
              hasNextPage={data.hasNextPage}
              hasPreviousPage={data.hasPreviousPage}
              lastPage={data.lastPage}
              setPage={setPage}
              section='adminOrders'
            />
          </div>
        )}
      </section>
      </PageContainer>
    </main>
  );
}
OrdersHome.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
