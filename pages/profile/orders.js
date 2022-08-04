import { useEffect, useState } from "react";
import Image from "next/image";

import { useGetDataQuery } from "app/slices/fetchApi.slice";
import { useSelector } from "react-redux";

import { BigLoading, Buttons, OrderCard } from "components";

export default function Orders() {
  //? Local State
  const [orders, setOrders] = useState([]);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Get Query
  const { data, isSuccess, isLoading } = useGetDataQuery({
    url: "/api/order",
    token,
  });

  useEffect(() => {
    if (isSuccess) setOrders(data.orders);
  }, [isSuccess]);

  return (
    <main>
      <Buttons.Back backRoute='/profile'>تاریخچه سفارشات</Buttons.Back>
      <div className='section-divide-y' />
      {isLoading ? (
        <section className='px-3 py-20'>
          <BigLoading />
        </section>
      ) : orders.length === 0 ? (
        <section className='py-20'>
          <div className='relative mx-auto h-52 w-52'>
            <Image src='/icons/order-empty.svg' layout='fill' />
          </div>

          <p className='text-center'>هنوز هیچ سفارشی ندادید</p>
        </section>
      ) : (
        <section className='px-4 py-3 space-y-3'>
          {orders.map((item) => (
            <OrderCard key={item._id} item={item} />
          ))}
        </section>
      )}
    </main>
  );
}
Orders.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
