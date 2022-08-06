import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { clearCart } from "app/slices/cart.slice";
import { usePostDataMutation } from "app/slices/fetchApi.slice";
import { openModal } from "app/slices/modal.slice";
import { useDispatch, useSelector } from "react-redux";

import { CartInfo, Icons, Loading } from "components";

import { formatNumber } from "utils/formatNumber";
import Head from "next/head";

export default function ShippingPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    postData,
    { data, isSuccess, isError, isLoading, error },
  ] = usePostDataMutation();

  //? Local State
  const [paymentMethod, setPaymentMethod] = useState("پرداخت در محل");

  //? Store
  const { user, token } = useSelector((state) => state.user);
  const { cartItems, totalItems, totalDiscount, totalPrice } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "success",
          text: data.msg,
        })
      );
      dispatch(clearCart());
      router.push("/profile");
    }
    if (isError) {
      dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "error",
          text: error?.data.err,
        })
      );
    }
  }, [isSuccess, isError]);

  //? Handlers
  const handleChangeAddress = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "edit-address",
        title: "ثبت و ویرایش آدرس",
      })
    );
  };

  const handleCreateOrder = () => {
    if (
      !user.address?.city &&
      !user.address?.provinces &&
      !user.address?.street &&
      !user.address?.postalCode
    )
      return dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "error",
          text: "لطفا آدرس خود را تکمیل کنید",
        })
      );
    postData({
      url: "/api/order",
      body: {
        address: user.address,
        mobile: user.mobile,
        cart: cartItems,
        totalItems,
        totalPrice,
        totalDiscount,
        paymentMethod,
      },
      token,
    });
  };

  return (
    <main className='py-2 mx-auto space-y-3 lg:max-w-7xl lg:px-5 lg:py-10'>
        <Head>
          <title>دیجی‌کالا | پرداخت</title>
        </Head>
      {/* header */}
      <header className='lg:border lg:border-gray-200 lg:rounded-lg'>
        <Link href='/'>
          <a>
            <div className='relative w-24 h-12 mx-auto'>
              <Image src='/icons/logoPersian.svg' layout='fill' />
            </div>
          </a>
        </Link>
        <div className='flex items-center justify-evenly'>
          <Link href='/checkout/cart'>
            <a className='flex flex-col items-center gap-y-2'>
              <Icons.Cart className='text-red-300 icon' />
              <span className='font-normal text-red-300'>سبد خرید</span>
            </a>
          </Link>

          <div className='h-[1px] w-8  bg-red-300' />
          <div className='flex flex-col items-center gap-y-2'>
            <Icons.Wallet className='w-6 h-6 text-red-500 icon' />
            <span className='text-base font-normal text-red-500'>پرداخت</span>
          </div>
        </div>
      </header>

      <div className='section-divide-y lg:hidden' />

      <div className='lg:flex lg:gap-x-3'>
        <div className='lg:flex-1'>
          {/* address */}
          <section className='flex items-center px-3 py-4 lg:border lg:border-gray-200 lg:rounded-lg gap-x-3'>
            <Icons.Location2 className='text-black w-7 h-7' />
            <div className='space-y-2'>
              <span className=''>آدرس تحویل سفارش</span>
              <p className='text-base text-black'>{user?.address?.street}</p>
              <span className='text-sm'>{user.name}</span>
            </div>
            <button
              type='button'
              onClick={handleChangeAddress}
              className='flex items-center mr-auto'
            >
              <span className='text-base text-sky-500'>تغییر | ویرایش</span>
              <Icons.ArrowLeft className='icon text-sky-500' />
            </button>
          </section>

          <div className='section-divide-y lg:hidden' />

          {/* products */}
          <section className='px-2 py-4 mx-3 border border-gray-200 rounded-lg lg:mx-0 lg:mt-3 '>
            <div className='flex mb-5'>
              <div className='relative w-10 h-10 ml-4 '>
                <Image src='/icons/car.png' layout='fill' />
              </div>
              <div>
                <span className='text-base text-black'>ارسال عادی</span>
                <span className='block'>موجود در انبار</span>
              </div>
              <span className='inline-block px-2 py-1 mr-3 bg-gray-100 rounded-lg farsi-digits h-fit'>
                {formatNumber(totalItems)} کالا
              </span>
            </div>
            <div className='flex flex-wrap justify-start gap-x-8 gap-y-5'>
              {cartItems.map((item) => (
                <article key={item.itemID}>
                  <div className='relative w-24 h-28 '>
                    <Image src={item.img.url} layout='fill' />
                    <span className='absolute farsi-digits order-badge lg:block'>
                      {formatNumber(item.quantity)}
                    </span>
                  </div>
                  {item.color && (
                    <div className='flex items-center gap-x-2 mr-3 mt-1.5'>
                      <span
                        className='inline-block w-4 h-4 shadow rounded-xl'
                        style={{ background: item.color.hashCode }}
                      />
                      <span>{item.color.name}</span>
                    </div>
                  )}

                  {item.size && (
                    <div className='flex items-center gap-x-2'>
                      <Icons.Rule className='icon' />
                      <span>{item.size.size}</span>
                    </div>
                  )}
                </article>
              ))}
            </div>

            <Link href='/checkout/cart'>
              <a className='inline-block mt-6 text-sm text-sky-500'>
                بازگشت به سبد خرید
              </a>
            </Link>
          </section>
        </div>

        <div className='section-divide-y lg:hidden' />

        {/* cart info */}
        <section className='lg:border lg:border-gray-200 lg:rounded-md lg:h-fit'>
          <CartInfo />
          <div className='px-3 py-2 space-y-3'>
            <div className='flex items-center gap-x-2 '>
              <input
                type='radio'
                name='cash'
                id='cash'
                value='پرداخت در محل'
                checked={paymentMethod === "پرداخت در محل"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className='text-sm' htmlFor='cash'>
                پرداخت در محل
              </label>
            </div>
            <div className='flex items-center gap-x-2 '>
              <input
                type='radio'
                name='zarinPal'
                id='zarinPal'
                value='زرین پال'
                disabled={true}
                checked={paymentMethod === "زرین پال"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className='text-sm' htmlFor='zarinPal'>
                زرین پال (بزودی)
              </label>
            </div>
            <button
              onClick={handleCreateOrder}
              className='w-full max-w-5xl mx-auto btn'
              type='button'
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "نهایی کردن خرید"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
