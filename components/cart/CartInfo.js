import { useSelector } from "react-redux";

import { formatNumber } from "utils/formatNumber";

import { Button, Toman, TomanRed } from "components";

export default function CartInfo({ handleRoute, cart }) {
  //? Store
  const { totalItems, totalPrice, totalDiscount } = useSelector(
    (state) => state.cart
  );
  return (
    <div className='cart-info'>
      {/* total cart price */}
      <div className='cart-info__item pb-2 border-b border-gray-200'>
        <span>قیمت کالاها ({formatNumber(totalItems)})</span>
        <div className='flex-center'>
          <span>{formatNumber(totalPrice)}</span>
          <Toman className='mr-1 w-7 h-7' />
        </div>
      </div>

      {/* total cart items */}
      <div className='cart-info__item'>
        <span>جمع سبد خرید</span>
        <div className='flex-center'>
          <span>{formatNumber(totalPrice - totalDiscount)}</span>
          <Toman className='mr-1 w-7 h-7' />
        </div>
      </div>

      <span className='inline-block w-full pb-2 border-b border-gray-200 lg:max-w-xs'>
        هزینه ارسال براساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه می‌شود
      </span>

      {/* total cart profit */}
      <div className='cart-info__item'>
        <span className='text-red-500'>سود شما از خرید</span>
        <div className='flex-center gap-x-1'>
          <span className='text-red-500 '>
            (% {((totalDiscount / totalPrice) * 100).toFixed(1)})
          </span>
          <span className='text-red-500'>{formatNumber(totalDiscount)}</span>
          <TomanRed className='mr-1 w-7 h-7' />
        </div>
      </div>

      {cart && (
        <Button onClick={handleRoute} className='hidden w-full lg:block'>
          ادامه
        </Button>
      )}
    </div>
  );
}
