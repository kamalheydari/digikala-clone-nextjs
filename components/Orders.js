import Image from "next/image";
import { ArrowLink } from "components";

export default function Orders() {
  return (
    <>
      <div className=' py-6 lg:py-0'>
        <div className='flex justify-between mb-7 px-5'>
          <h2 className='inline-block py-1 border-b-2 border-red-500'>
            سفارش‌های من
          </h2>
          <ArrowLink path='profile/orders'>مشاهده همه</ArrowLink>
        </div>
        <div className='flex justify-evenly lg:py-20'>
          <div className='flex flex-col items-center lg:flex-row lg:gap-x-2'>
            <div className='relative w-14 h-14 '>
              <Image src='/icons/status-processing.svg' layout='fill' />
              <span className='absolute order-badge'>0</span>
            </div>
            <div className='text-gray-700'>
              <span className='hidden lg:block'> 0 سفارش</span>
              <span>جاری</span>
            </div>
          </div>

          <div className="section-divide-x"/>


          <div className='flex flex-col items-center lg:flex-row lg:gap-x-2'>
            <div className='relative w-14 h-14 '>
              <Image src='/icons/status-delivered.svg' layout='fill' />
              <span className='absolute order-badge'>0</span>
            </div>
            <div className='text-gray-700'>
              <span className='hidden lg:block'> 0 سفارش</span>
              <span>تحویل شده</span>
            </div>
          </div>

          <div className="section-divide-x"/>

          <div className='flex flex-col items-center lg:flex-row lg:gap-x-2'>
            <div className='relative w-14 h-14 '>
              <Image src='/icons/status-returned.svg' layout='fill' />
              <span className='absolute order-badge'>0</span>
            </div>
            <div className='text-gray-700'>
              <span className='hidden lg:block'> 0 سفارش</span>
              <span>مرجوع</span>
            </div>
          </div>
        </div>
      </div>
      <div className='section-divide-y' />
    </>
  );
}
