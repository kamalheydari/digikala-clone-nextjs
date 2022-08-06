import { useState } from "react";
import Image from "next/image";

import { useGetDataQuery } from "app/slices/fetchApi.slice";
import { useSelector } from "react-redux";

import { BigLoading, Buttons, OrderCard, Pagination } from "components";

export default function Orders() {
  //? Local State
  const [page, setPage] = useState(1);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Get Query
  const { data, isLoading } = useGetDataQuery({
    url: `/api/order?page=${page}&page_size=5`,
    token,
  });

  return (
    <main>
      <Buttons.Back backRoute='/profile'>تاریخچه سفارشات</Buttons.Back>
      <div className='section-divide-y' />
      {isLoading ? (
        <section className='px-3 py-20'>
          <BigLoading />
        </section>
      ) : data.ordersLength === 0 ? (
        <section className='py-20'>
          <div className='relative mx-auto h-52 w-52'>
            <Image src='/icons/order-empty.svg' layout='fill' />
          </div>

          <p className='text-center'>هنوز هیچ سفارشی ندادید</p>
        </section>
      ) : (
        <section className='px-4 py-3 space-y-3'>
          {data.orders.map((item) => (
            <OrderCard key={item._id} item={item} />
          ))}
        </section>
      )}

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
