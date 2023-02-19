import { formatNumber } from "utils/formatNumber";

import { DiscountProduct, Toman } from "components";

export default function ProductPrice({
  singleProduct,
  inStock,
  discount,
  price,
}) {
  return (
    <div className={`${singleProduct && "flex flex-col-reverse"}`}>
      <div className='flex items-center'>
        <span className='farsi-digits text-sm text-gray-700'>
          {formatNumber(price - (discount * price) / 100)}
        </span>
        <Toman className='mr-1 w-7 h-7' />
      </div>

      {discount > 0 && (
        <div>
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
}
