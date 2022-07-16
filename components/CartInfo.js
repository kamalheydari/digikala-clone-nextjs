import { useSelector } from "react-redux";

import { formatNumber } from "utils/formatNumber";

import Image from "next/image";

export default function CartInfo({ handleRoute, cart }) {
  //? Store
  const { totalItems, totalPrice, totalDiscount } = useSelector(
    (state) => state.cart
  );
  return (
    <div className='px-4 py-2 mt-10 space-y-5 lg:mt-0 lg:h-fit lg:py-4 '>
      <div className='flex justify-between border-b border-gray-200 pb-2'>
        <span className='text-sm font-thin farsi-digits'>
          قیمت کالاها ({formatNumber(totalItems)})
        </span>
        <div className='flex items-center'>
          <span className='text-sm farsi-digits'>
            {formatNumber(totalPrice)}
          </span>
          <div className='relative mr-1 w-7 h-7'>
            <Image src='/icons/toman.svg' layout='fill' />
          </div>
        </div>
      </div>
      <div className='flex justify-between'>
        <span className='text-sm font-thin'>جمع سبد خرید</span>
        <div className='flex items-center'>
          <span className='text-sm farsi-digits'>
            {formatNumber(totalPrice - totalDiscount)}
          </span>
          <div className='relative mr-1 w-7 h-7'>
            <Image src='/icons/toman.svg' layout='fill' />
          </div>
        </div>
      </div>
      <span className='inline-block lg:max-w-xs border-b border-gray-200 pb-2 w-full'>
        هزینه ارسال براساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه می‌شود
      </span>
      <div className='flex justify-between'>
        <span className='text-sm font-thin text-red-500'>سود شما از خرید</span>
        <div className='flex items-center gap-x-1'>
          <span className='text-sm text-red-500 farsi-digits'>
            (% {((totalDiscount / totalPrice) * 100).toFixed(1)})
          </span>
          <span className='text-sm text-red-500 farsi-digits'>
            {formatNumber(totalDiscount)}
          </span>
          <div className='relative mr-1 w-7 h-7'>
            <Image src='/icons/tomanRed.svg' layout='fill' />
          </div>
        </div>
      </div>
      {cart && (
        <button onClick={handleRoute} className='w-full hidden lg:block btn'>
          ادامه
        </button>
      )}
    </div>
  );
}
