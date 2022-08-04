import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useGetDataQuery } from "app/slices/fetchApi.slice";
import { openModal } from "app/slices/modal.slice";
import { useDispatch, useSelector } from "react-redux";

import { BigLoading, Buttons } from "components";

export default function OrdersHome() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? Local State
  const [orders, setOrders] = useState([]);

  //? Store
  const { token } = useSelector((state) => state.user);
  const { isConfirm } = useSelector((state) => state.modal);

  //? Get Query
  const { data, isSuccess, isLoading } = useGetDataQuery({
    url: "/api/order",
    token,
  });

  useEffect(() => {
    if (isSuccess) setOrders(data.orders);
  }, [isSuccess]);

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
      <Buttons.Back backRoute='/admin'>سفارشات</Buttons.Back>
      <div className='section-divide-y' />
      {isLoading && (
        <section className='px-3 py-20'>
          <BigLoading />
        </section>
      )}
      <section className='p-3 md:px-3 xl:px-8 2xl:px-10'>
        {isSuccess && (
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
                {orders.map((order) => (
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
        )}
      </section>
    </main>
  );
}
OrdersHome.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
