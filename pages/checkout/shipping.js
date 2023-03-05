import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { clearCart } from 'app/slices/cart.slice'
import { useCreateOrderMutation } from 'app/api/orderApi'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert } from 'app/slices/alert.slice'

import {
  Button,
  CartInfo,
  HandleResponse,
  Icons,
  LogoPersian,
} from 'components'

import { withAddressModal } from 'HOCs/withAddressModal'

import { formatNumber } from 'utils/formatNumber'
import useUserInfo from 'hooks/useUserInfo'

export default function ShippingPage() {
  //? Assets
  const router = useRouter()
  const dispatch = useDispatch()

  //? Get User Data
  const { userInfo } = useUserInfo()

  //? States
  const [paymentMethod, setPaymentMethod] = useState('پرداخت در محل')

  //? Store
  const { cartItems, totalItems, totalDiscount, totalPrice } = useSelector(
    (state) => state.cart
  )

  //? Create Order Query
  const [postData, { data, isSuccess, isError, isLoading, error }] =
    useCreateOrderMutation()

  //? Handlers
  const handleCreateOrder = () => {
    if (
      !userInfo.address?.city &&
      !userInfo.address?.provinces &&
      !userInfo.address?.street &&
      !userInfo.address?.postalCode
    )
      return dispatch(
        showAlert({
          status: 'error',
          title: 'لطفا آدرس خود را تکمیل کنید',
        })
      )
    postData({
      body: {
        address: userInfo.address,
        mobile: userInfo.mobile,
        cart: cartItems,
        totalItems,
        totalPrice,
        totalDiscount,
        paymentMethod,
      },
    })
  }

  //? Local Components
  const ChangeAddress = withAddressModal(({ openAddressModal }) => (
    <button
      type='button'
      onClick={openAddressModal}
      className='flex items-center mr-auto'
    >
      <span className='text-base text-sky-500'>تغییر | ویرایش</span>
      <Icons.ArrowLeft className='icon text-sky-500' />
    </button>
  ))

  //? Render
  return (
    <>
      {/*  Handle Create Order Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.err}
          message={data?.msg}
          onSuccess={() => {
            dispatch(clearCart())
            router.push('/profile')
          }}
        />
      )}

      <main className='py-2 mx-auto space-y-3 lg:max-w-7xl lg:px-5 lg:py-10'>
        <Head>
          <title>دیجی‌کالا | پرداخت</title>
        </Head>
        {/* header */}
        <header className='lg:border lg:border-gray-200 lg:rounded-lg'>
          <Link href='/'>
            <a>
              <LogoPersian className='w-24 h-12 mx-auto' />
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
                <p className='text-base text-black'>
                  {userInfo?.address?.street}
                </p>
                <span className='text-sm'>{userInfo?.name}</span>
              </div>
              <ChangeAddress />
            </section>

            <div className='section-divide-y lg:hidden' />

            {/* products */}
            <section className='px-2 py-4 mx-3 border border-gray-200 rounded-lg lg:mx-0 lg:mt-3 '>
              <div className='flex mb-5'>
                <div className='relative w-10 h-10 ml-4 '>
                  <Image src='/icons/car.png' layout='fill' alt='ارسال' />
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
                      <Image
                        src={item.img.url}
                        layout='fill'
                        alt={item.name}
                        placeholder='blur'
                        blurDataURL='/placeholder.png'
                      />
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
                  checked={paymentMethod === 'پرداخت در محل'}
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
                  checked={paymentMethod === 'زرین پال'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className='text-sm' htmlFor='zarinPal'>
                  زرین پال (بزودی)
                </label>
              </div>
              <Button
                onClick={handleCreateOrder}
                isLoading={isLoading}
                className='w-full max-w-5xl mx-auto'
              >
                نهایی کردن خرید
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
