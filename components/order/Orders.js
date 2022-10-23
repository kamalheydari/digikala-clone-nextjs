import { useState, useEffect } from "react";
import Image from "next/image";

import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "app/api/orderApi";

import { formatNumber } from "utils/formatNumber";

import { ArrowLink } from "components";

export default function Orders() {
  //? Local State
  const [pendingOrder, setPendingOrder] = useState(0);
  const [successOrder, setSuccessOrder] = useState(0);

  //? Get Order Query
  const { data, isSuccess, refetch, isError, error } = useGetOrdersQuery({});

  //? Handle Get Order Response
  useEffect(() => {
    if (isSuccess) {
      const pending = data?.orders.filter((item) => item.delivered === false);
      const success = data?.orders.filter((item) => item.delivered === true);

      setPendingOrder(pending.length);
      setSuccessOrder(success.length);
    }
  }, [isSuccess]);

  return (
    <section>
      {isError ? (
        <div className='py-10 mx-auto space-y-3 text-center lg:py-20 w-fit'>
          <h5 className='text-xl'>خطایی رخ داده</h5>
          <p className='text-lg text-red-500'>{error.data.err}</p>
          <button className='btn' onClick={refetch}>
            تلاش مجدد
          </button>
        </div>
      ) : (
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
                <Image
                  src='/icons/status-processing.svg'
                  layout='fill'
                  alt='جاری'
                />
                <span className='absolute farsi-digits order-badge'>
                  {formatNumber(pendingOrder)}
                </span>
              </div>
              <div className='text-gray-700'>
                <span className='hidden farsi-digits lg:block lg:text-black lg:text-md'>
                  {formatNumber(pendingOrder)} سفارش
                </span>
                <span className='text-xs lg:text-sm'>جاری</span>
              </div>
            </div>

            <div className='section-divide-x' />

            <div className='flex flex-col items-center lg:flex-row lg:gap-x-2'>
              <div className='relative w-12 h-12 lg:w-14 lg:h-14'>
                <Image
                  src='/icons/status-delivered.svg'
                  layout='fill'
                  alt='تحویل شده'
                />
                <span className='absolute farsi-digits order-badge'>
                  {formatNumber(successOrder)}
                </span>
              </div>
              <div className='text-gray-700'>
                <span className='hidden farsi-digits lg:block lg:text-black lg:text-md'>
                  {formatNumber(successOrder)} سفارش
                </span>
                <span className='text-xs lg:text-sm'>تحویل شده</span>
              </div>
            </div>

            <div className='section-divide-x' />

            <div className='flex flex-col items-center lg:flex-row lg:gap-x-2'>
              <div className='relative w-12 h-12 lg:w-14 lg:h-14'>
                <Image
                  src='/icons/status-returned.svg'
                  layout='fill'
                  alt='مرجوع'
                />
                <span className='absolute order-badge farsi-digits'>0</span>
              </div>
              <div className='text-gray-700'>
                <span className='hidden lg:block lg:text-black lg:text-md farsi-digits'>
                  0 سفارش
                </span>
                <span className='text-xs lg:text-sm'>مرجوع</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='section-divide-y' />
    </section>
  );
}
