import Image from "next/image";

import { formatNumber } from "utils/formatNumber";

export default function DiscountCartItem({ item }) {
  const discount = item.discount / 100;

  return (
    <div>
      <div className='flex items-center gap-x-2'>
        <span className='text-red-500 farsi-digits'>
          {formatNumber((item.price * discount).toFixed())}
        </span>
        <div className='relative w-6 h-6'>
          <Image src='/icons/tomanRed.svg' layout='fill' />
        </div>
        <span className='text-red-500'>تخفیف</span>
      </div>
      <div className='flex items-center gap-x-2'>
        <span className='text-sm text-gray-700 farsi-digits'>
          {formatNumber(item.price - (item.discount * item.price) / 100)}
        </span>
        <div className='relative w-6 h-6'>
          <Image src='/icons/toman.svg' layout='fill' />
        </div>
      </div>
    </div>
  );
}
