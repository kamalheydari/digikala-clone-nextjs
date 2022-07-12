import Image from "next/image";

import { toFarsiNumber } from "utils/FarsiNumber";

export default function DiscountCartItem({ item }) {
  const discount = item.discount / 100;

  return (
    <div>
      <div className='flex items-center gap-x-2'>
        <span className='text-red-500'>
          {toFarsiNumber(item.price * discount)}
        </span>
        <div className='relative w-6 h-6'>
          <Image src='/icons/tomanRed.svg' layout='fill' />
        </div>
        <span className='text-red-500'>تخفیف</span>
      </div>
      <div className='flex items-center gap-x-2'>
        <span className='text-sm text-gray-700'>
          {toFarsiNumber(item.price - (item.discount * item.price) / 100)}
        </span>
        <div className='relative w-6 h-6'>
          <Image src='/icons/toman.svg' layout='fill' />
        </div>
      </div>
    </div>
  );
}
