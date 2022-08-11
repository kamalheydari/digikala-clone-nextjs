import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useGetDataQuery } from "app/slices/fetchApi.slice";
import { openModal } from "app/slices/modal.slice";
import { useDispatch, useSelector } from "react-redux";

import {
  Buttons,
  Pagination,
  ShowWrapper,
  EmptyOrdersList,
} from "components";

export default function OrdersHome() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? Local State
  const [page, setPage] = useState(1);

  //? Store
  const { token } = useSelector((state) => state.user);
  const { isConfirm } = useSelector((state) => state.modal);

  //? Get Query
  const {
    data,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetDataQuery({
    url: `/api/order?page=${page}&page_size=10`,
    token,
  });

  useEffect(() => {
    if (isConfirm) router.reload();
  }, [isConfirm]);

  //? Handlers
  const handleEditOrder = (id) => {
    dispatch(
      openModal({
        isShow: true,
        id,
        type: "confirm-update-order",
        title: "سفارش",
        editedData: { paid: true, delivered: true },
      })
    );
  };

  return (
    <main>
      <Head>
        <title>مدیریت | سفارشات</title>
      </Head>
      <Buttons.Back backRoute='/admin'>سفارشات</Buttons.Back>
      <div className='section-divide-y' />
      <div className='p-3 md:px-3 xl:px-8 2xl:px-10'>
        <ShowWrapper
          error={error}
          isError={isError}
          refetch={refetch}
          isFetching={isFetching}
          isSuccess={isSuccess}
          dataLength={data ? data.ordersLength : 0}
          emptyElement={<EmptyOrdersList />}
          top
        >
          <div className='overflow-x-auto mt-7'>
            <table className='w-full whitespace-nowrap'>
              <thead className='h-9 bg-emerald-50'>
                <tr className='text-emerald-500'>
                  <th className='border-gray-100 border-x-2'>ID</th>
                  <th>نام گیرنده</th>
                  <th className='border-gray-100 border-x-2'>ایمیل</th>
                  <th>وضعیت</th>
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
                    <td className='py-3 px-1.5'>{order.user.email}</td>
                    <td className='py-3 px-1.5'>
                      {order.delivered ? (
                        <span className='inline-block p-1 text-green-600 rounded-md bg-green-50'>
                          تحویل داده شده
                        </span>
                      ) : (
                        <button
                          type='button'
                          onClick={() => handleEditOrder(order._id)}
                          className='p-1 rounded-md text-amber-600 bg-amber-50'
                        >
                          تغییر وضعیت به تحویل داده شده
                        </button>
                      )}
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
            />
          </div>
        )}
      </div>
    </main>
  );
}
OrdersHome.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
