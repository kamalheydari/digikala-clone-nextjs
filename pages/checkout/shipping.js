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

export default function ShippingPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [
    postData,
    { data, isSuccess, isError, isLoading,error },
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
      dispatch(clearCart())
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
    <div className='py-2 mx-auto space-y-3 lg:max-w-7xl  lg:px-5  lg:py-10'>
      {/* header */}
      <div className='lg:border lg:border-gray-200 lg:rounded-lg'>
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
              <Icons.Cart className='icon text-red-300' />
              <span className='text-red-300 font-normal'>سبد خرید</span>
            </a>
          </Link>

          <div className='h-[1px] w-8  bg-red-300' />
          <div className='flex flex-col items-center gap-y-2'>
            <Icons.Wallet className='icon w-6 h-6 text-red-500' />
            <span className='text-red-500 font-normal text-base'>پرداخت</span>
          </div>
        </div>
      </div>

      <div className='section-divide-y lg:hidden' />

      <div className='lg:flex lg:gap-x-3'>
        <div className='lg:flex-1'>
          {/* address */}
          <div className='lg:border lg:border-gray-200 lg:rounded-lg px-3 py-4 flex items-center gap-x-3'>
            <Icons.Location2 className='text-black w-7 h-7' />
            <div className='space-y-2'>
              <span className=''>آدرس تحویل سفارش</span>
              <p className='text-black text-base'>{user?.address?.street}</p>
              <span className='text-sm'>{user.name}</span>
            </div>
            <button
              type='button'
              onClick={handleChangeAddress}
              className='flex items-center mr-auto'
            >
              <span className='text-sky-500 text-base'>تغییر | ویرایش</span>
              <Icons.ArrowLeft className='icon text-sky-500' />
            </button>
          </div>

          <div className='section-divide-y lg:hidden' />

          {/* products */}
          <div className='border mx-3 lg:mx-0 lg:mt-3 border-gray-200 rounded-lg  px-2 py-4 '>
            <div className='flex mb-5'>
              <div className='relative ml-4 w-10 h-10 '>
                <Image src='/icons/car.png' layout='fill' />
              </div>
              <div>
                <span className='text-black text-base'>ارسال عادی</span>
                <span className='block'>موجود در انبار</span>
              </div>
              <span className='farsi-digits bg-gray-100 inline-block px-2 py-1 mr-3 h-fit rounded-lg'>
                {formatNumber(totalItems)} کالا
              </span>
            </div>
            <div className='flex flex-wrap gap-x-8 gap-y-5 justify-start'>
              {cartItems.map((item) => (
                <article key={item.itemID}>
                  <div className='relative w-24 h-28 '>
                    <Image src={item.img.url} layout='fill' />
                    <span className='farsi-digits order-badge lg:block absolute'>
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
              <a className='mt-6 text-sm inline-block text-sky-500'>
                بازگشت به سبد خرید
              </a>
            </Link>
          </div>
        </div>

        <div className='section-divide-y lg:hidden' />

        {/* cart info */}
        <div className='lg:border lg:border-gray-200 lg:rounded-md lg:h-fit'>
          <CartInfo />
          <div className='px-3 py-2 space-y-3'>
            <div className='flex items-center gap-x-2 '>
              <input
                type='radio'
                name='cash'
                id='cash'
                value="پرداخت در محل"
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
              className='btn w-full max-w-5xl mx-auto'
              type='button'
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "نهایی کردن خرید"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
