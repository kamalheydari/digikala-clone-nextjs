import Image from "next/image";

import { formatNumber } from "utils/formatNumber";

import { DiscountProduct } from "components";

export default function ProductPrice({
  singleProduct,
  inStock,
  discount,
  price,
}) {
  if (inStock !== 0) {
    return (
      <div className={`${singleProduct && "flex flex-col-reverse"}`}>
        <div className={`flex items-center ${discount === 0 && "h-12 my-0.5"}`}>
          <span className='text-sm text-gray-700 farsi-digits'>
            {formatNumber(price - (discount * price) / 100)}
          </span>
          <div className='relative mr-1 w-7 h-7'>
            <Image src='/icons/toman.svg' layout='fill' />
          </div>
        </div>

        {discount > 0 && (
          <div className=''>
            <span className='ml-2 text-sm text-gray-500 line-through farsi-digits'>
              {formatNumber(price)}
            </span>
            {singleProduct && discount > 0 && inStock !== 0 && (
              <DiscountProduct discount={discount} />
            )}
          </div>
        )}
      </div>
    );
  } else {
    return <span className='h-12 my-0.5'>ناموجود</span>;
  }
}
