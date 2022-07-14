import { clearCart } from "app/slices/cartSlice";
import { Icons, FreeShipping, CartItem, Buttons } from "components";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { toFarsiNumber } from "utils/FarsiNumber";

export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems, totalItems, totalPrice, totalDiscount } = useSelector(
    (state) => state.cart
  );

  if (cartItems.length === 0)
    return (
      <div className='py-2 mx-auto mb-20 space-y-3 xl:mt-36  lg:mb-0 lg:max-w-7xl b lg:px-5 lg:mt-6 lg:space-y-0 lg:py-4 lg:border lg:border-gray-200 lg:rounded-md'>
        <Buttons.Back backRoute='/profile'>سبد خرید شما</Buttons.Back>
        <div className='section-divide-y' />

        <div className='py-20'>
          <div className='relative mx-auto h-52 w-52'>
            <Image src='/icons/empty-cart.svg' layout='fill' />
          </div>
          <p className='text-base font-bold text-center'>
            سبد خرید شما خالی است!
          </p>
        </div>
      </div>
    );

  return (
    <div className='py-2 mx-auto mb-20 space-y-3 xl:mt-36 lg:py-0 lg:mb-0 lg:max-w-7xl b lg:px-5 lg:mt-6 lg:gap-x-3 lg:flex lg:flex-wrap lg:space-y-0'>
      <div className='lg:py-4 lg:border lg:border-gray-200 lg:rounded-md lg:flex-1 h-fit'>
        {/* title */}
        <div className='flex justify-between px-4'>
          <div>
            <h3 className='mb-2 text-sm font-bold'>سبد خرید شما</h3>
            <span className='text-sm'>{toFarsiNumber(totalItems)} کالا</span>
          </div>

          <div className='relative h-fit px-1.5 group'>
            <Icons.More className='cursor-pointer icon' />
            <button
              onClick={() => dispatch(clearCart())}
              className='absolute left-0 items-center hidden px-4 py-3 bg-white rounded shadow-3xl top-5 w-36 gap-x-2 group-hover:flex '
            >
              <Icons.Delete className='icon' />
              <span>حذف همه</span>
            </button>
          </div>
        </div>

        {/* carts */}
        <div className='divide-y'>
          {cartItems.map((item) => (
            <CartItem item={item} key={item.itemID} />
          ))}
        </div>
      </div>

      {/* cart Info */}
      <div className='lg:sticky lg:top-6 lg:h-fit xl:top-36'>
        <div className='px-4 mt-10 space-y-5 lg:mt-0 lg:h-fit lg:py-4 lg:border lg:border-gray-200 lg:rounded-md'>
          <div className='flex justify-between'>
            <span className='text-sm font-thin'>
              قیمت کالاها ({toFarsiNumber(totalItems)})
            </span>
            <div className='flex items-center'>
              <span className='text-sm'>{toFarsiNumber(totalPrice)}</span>
              <div className='relative mr-1 w-7 h-7'>
                <Image src='/icons/toman.svg' layout='fill' />
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            <span className='text-sm font-thin'>جمع سبد خرید</span>
            <div className='flex items-center'>
              <span className='text-sm'>
                {toFarsiNumber(totalPrice - totalDiscount)}
              </span>
              <div className='relative mr-1 w-7 h-7'>
                <Image src='/icons/toman.svg' layout='fill' />
              </div>
            </div>
          </div>
          <span className='inline-block lg:max-w-xs'>
            هزینه ارسال براساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه
            می‌شود
          </span>
          <div className='flex justify-between'>
            <span className='text-sm font-thin text-red-500'>
              سود شما از خرید
            </span>
            <div className='flex items-center gap-x-1'>
              <span className='text-sm text-red-500'>
                {toFarsiNumber(totalDiscount)}
              </span>
              <div className='relative mr-1 w-7 h-7'>
                <Image src='/icons/tomanRed.svg' layout='fill' />
              </div>
            </div>
          </div>
          <button className='w-full btn'>ادامه</button>
        </div>
        <FreeShipping />
      </div>

      {/* to Shipping */}
      <div className='fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-3 bg-white border-t border-gray-300 shadow-3xl lg:hidden'>
        <button className='w-1/2 btn'>ادامه</button>
        <div>
          <span className='font-thin'>جمع سبد خرید</span>
          <div className='flex items-center'>
            <span className='text-sm'>
              {toFarsiNumber(totalPrice - totalDiscount)}
            </span>
            <div className='relative mr-1 w-7 h-7'>
              <Image src='/icons/toman.svg' layout='fill' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Cart.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
