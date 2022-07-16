import { useState, useEffect } from "react";
import Image from "next/image";

import { useGetDataQuery } from "app/slices/fetchApiSlice";
import { useSelector } from "react-redux";

import { formatNumber } from "utils/formatNumber";

import { ArrowLink } from "components";

export default function Orders() {
  //? Local State
  const [pendingOrder, setPendingOrder] = useState(0);
  const [successOrder, setSuccessOrder] = useState(0);

  //? Store
  const { token } = useSelector((state) => state.auth);

  //? Get Query
  const { data, isSuccess } = useGetDataQuery({ url: "/api/order", token });

  useEffect(() => {
    if (isSuccess) {
      const pending = data?.orders.filter((item) => item.delivered === false);
      const success = data?.orders.filter((item) => item.delivered === true);

      setPendingOrder(pending.length);
      setSuccessOrder(success.length);
    }
  }, [isSuccess]);

  return (
    <>
      <div className='py-6 lg:py-0'>
        <div className='flex justify-between px-5 mb-7'>
          <h4 className='inline-block py-1 text-sm border-b-2 border-red-500 md:text-base'>
            سفارش‌های من
          </h4>
          <ArrowLink path='profile/orders'>مشاهده همه</ArrowLink>
        </div>
        <div className='flex justify-evenly lg:py-20'>
          <div className='flex flex-col items-center lg:flex-row lg:gap-x-2'>
            <div className='relative w-12 h-12 lg:w-14 lg:h-14'>
              <Image src='/icons/status-processing.svg' layout='fill' />
              <span className='farsi-digits absolute order-badge'>
                {formatNumber(pendingOrder)}
              </span>
            </div>
            <div className='text-gray-700'>
              <span className='farsi-digits hidden lg:block lg:text-black lg:text-md'>
                {formatNumber(pendingOrder)} سفارش
              </span>
              <span className='text-xs lg:text-sm'>جاری</span>
            </div>
          </div>

          <div className='section-divide-x' />

          <div className='flex flex-col items-center lg:flex-row lg:gap-x-2'>
            <div className='relative w-12 h-12 lg:w-14 lg:h-14'>
              <Image src='/icons/status-delivered.svg' layout='fill' />
              <span className='farsi-digits absolute order-badge'>
                {formatNumber(successOrder)}
              </span>
            </div>
            <div className='text-gray-700'>
              <span className='farsi-digits hidden lg:block lg:text-black lg:text-md'>
                {formatNumber(successOrder)} سفارش
              </span>
              <span className='text-xs lg:text-sm'>تحویل شده</span>
            </div>
          </div>

          <div className='section-divide-x' />

          <div className='flex flex-col items-center lg:flex-row lg:gap-x-2'>
            <div className='relative w-12 h-12 lg:w-14 lg:h-14'>
              <Image src='/icons/status-returned.svg' layout='fill' />
              <span className='absolute order-badge'>0</span>
            </div>
            <div className='text-gray-700'>
              <span className='hidden lg:block lg:text-black lg:text-md'>
                0 سفارش
              </span>
              <span className='text-xs lg:text-sm'>مرجوع</span>
            </div>
          </div>
        </div>
      </div>
      <div className='section-divide-y' />
    </>
  );
}
