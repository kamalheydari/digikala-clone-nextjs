import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { formatNumber } from "utils/formatNumber";
import { openModal } from "app/slices/modal.slice";

import {
  Icons,
  ArrowLink,
  CartItem,
  RedirectToLogin,
  Button,
} from "components";

import useUserInfo from "hooks/useUserInfo";

export default function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { isVerify } = useUserInfo();

  //? Store
  const { totalItems, cartItems, totalDiscount, totalPrice } = useSelector(
    (state) => state.cart
  );

  //? Handlers
  const handleRoute = () => {
    if (!isVerify)
      return dispatch(
        openModal({
          isShow: true,
          type: "redirect",
          title: "شما هنوز وارد نشدید",
        })
      );

    router.push("/checkout/shipping");
  };

  return (
    <>
      <RedirectToLogin />
      <div className='relative group p-1 lg:pr-4 hover:bg-red-100 lg:rounded lg:m-1.5 lg:transition'>
        <span className='absolute outline outline-3  bottom-5 left-5 bg-red-500 rounded-full w-5 h-5 p-0.5 text-center text-xs text-white farsi-digits'>
          {formatNumber(totalItems)}
        </span>
        <Link href='/checkout/cart'>
          <a>
            <Icons.Cart className='icon h-7 w-7' />
          </a>
        </Link>
        {totalItems > 0 && (
          <div
            className='absolute left-0 transition duration-300 bg-white border border-gray-100 py-2 invisible opacity-0  lg:group-hover:opacity-100 lg:group-hover:visible  rounded z-40 shadow-xl top-full w-[440px]
       '
          >
            {/* Header */}
            <div className='flex items-center justify-between px-2 py-1'>
              <span className='farsi-digits'>{totalItems} کالا</span>
              <ArrowLink path='/checkout/cart'>مشاهده‌ی سبد خرید</ArrowLink>
            </div>
            {/* Itmes */}
            <div className='overflow-y-auto h-80'>
              {cartItems.map((item) => (
                <CartItem item={item} key={item.itemID} />
              ))}
            </div>
            {/* Footer */}
            <div className='px-3 pt-1.5 flex justify-between items-center border-t'>
              <div>
                <span>مبلغ قابل پرداخت</span>
                <div className='flex items-center'>
                  <span className='text-sm farsi-digits'>
                    {formatNumber(totalPrice - totalDiscount)}
                  </span>
                  <div className='relative mr-1 w-7 h-7'>
                    <Image src='/icons/toman.svg' layout='fill' alt='تومان' />
                  </div>
                </div>
              </div>
         
              <Button onClick={handleRoute}>ثبت سفارش</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
