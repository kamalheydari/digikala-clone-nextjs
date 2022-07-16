import Image from "next/image";

import { Buttons, OrderCard } from "components";
import { useEffect, useState } from "react";
import { useGetDataQuery } from "app/slices/fetchApiSlice";
import { useSelector } from "react-redux";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  //? Store
  const { token } = useSelector((state) => state.auth);

  //? Get Query
  const { data, isSuccess } = useGetDataQuery({ url: "/api/order", token });

  useEffect(() => {
    if (isSuccess) setOrders(data.orders);
  }, [isSuccess]);

  return (
    <div>
      <Buttons.Back backRoute='/profile'>تاریخچه سفارشات</Buttons.Back>
      <div className='section-divide-y' />
      {orders.length === 0 ? (
        <div className='py-20'>
          <div className='relative mx-auto h-52 w-52'>
            <Image src='/icons/order-empty.svg' layout='fill' />
          </div>

          <p className='text-center'>هنوز هیچ سفارشی ندادید</p>
        </div>
      ) : (
        <div className='py-3 px-4 space-y-3 '>
          {orders.map((item) => (
            <OrderCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
Orders.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
