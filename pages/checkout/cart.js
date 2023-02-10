import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { clearCart } from "app/slices/cart.slice";
import { openModal } from "app/slices/modal.slice";
import { useDispatch, useSelector } from "react-redux";

import {
  Icons,
  FreeShipping,
  CartItem,
  CartInfo,
  Header,
  RedirectToLogin,
  Button,
} from "components";

import { formatNumber } from "utils/formatNumber";

import useUserInfo from "hooks/useUserInfo";

export default function Cart() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? Get User Data
  const { userInfo } = useUserInfo();

  //? Store
  const { cartItems, totalItems, totalPrice, totalDiscount } = useSelector(
    (state) => state.cart
  );

  //? Handlers
  const handleRoute = () => {
    if (!userInfo)
      return dispatch(
        openModal({
          isShow: true,
          type: "redirect",
          title: "شما هنوز وارد نشدید",
        })
      );

    router.push("/checkout/shipping");
  };

  //? Render
  if (cartItems.length === 0)
    return (
      <>
        <Header />
        <section className='py-2 mx-auto mb-20 space-y-3 xl:mt-36 lg:mb-0 lg:max-w-7xl lg:px-5 lg:mt-6 lg:space-y-0 lg:py-4 lg:border lg:border-gray-200 lg:rounded-md'>
          <Head>
            <title>دیجی‌کالا | سبد خرید</title>
          </Head>
          <div className='section-divide-y' />

          <div className='py-20'>
            <div className='relative mx-auto h-52 w-52'>
              <Image src='/icons/empty-cart.svg' layout='fill' alt='سبد خالی' />
            </div>
            <p className='text-base font-bold text-center'>
              سبد خرید شما خالی است!
            </p>
          </div>
        </section>
      </>
    );

  return (
    <>
      <RedirectToLogin />
      <Header />
      <main className='py-2 mx-auto mb-20 space-y-3 xl:mt-36 lg:py-0 lg:mb-0 lg:max-w-7xl b lg:px-5 lg:mt-6 lg:gap-x-3 lg:flex lg:flex-wrap lg:space-y-0'>
        <Head>
          <title>دیجی‌کالا | سبد خرید</title>
        </Head>

        <div className='lg:py-4 lg:border lg:border-gray-200 lg:rounded-md lg:flex-1 h-fit'>
          {/* title */}
          <section className='flex justify-between px-4'>
            <div>
              <h3 className='mb-2 text-sm font-bold'>سبد خرید شما</h3>
              <span className='text-farsi-digits'>
                {formatNumber(totalItems)} کالا
              </span>
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
          </section>

          {/* carts */}
          <section className='divide-y'>
            {cartItems.map((item) => (
              <CartItem item={item} key={item.itemID} />
            ))}
          </section>
        </div>

        <div className='section-divide-y lg:hidden' />

        {/* cart Info */}
        <section className='lg:sticky lg:top-6 lg:h-fit xl:top-36'>
          <div className='lg:border lg:border-gray-200 lg:rounded-md'>
            <CartInfo handleRoute={handleRoute} cart />
          </div>
          <FreeShipping />
        </section>

        {/* to Shipping */}
        <section className='fixed bottom-0 left-0 right-0 z-10 flex items-center justify-between px-3 py-3 bg-white border-t border-gray-300 shadow-3xl lg:hidden'>
          <Button className='w-1/2' onClick={handleRoute}>
            ادامه
          </Button>
          <div>
            <span className='font-thin'>جمع سبد خرید</span>
            <div className='flex items-center'>
              <span className='text-sm farsi-digits'>
                {formatNumber(totalPrice - totalDiscount)}
              </span>
              <div className='relative mr-1 w-7 h-7'>
                <Image src='/icons/toman.svg' layout='fill' alt='تومان' />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
