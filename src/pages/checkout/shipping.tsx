import { useState } from 'react'

import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { clearCart, showAlert } from 'store'

import { useCreateOrderMutation } from 'services'

import { Button, CartInfo, HandleResponse, RequireUser, ResponsiveImage, WithAddressModal } from 'components'
import { ArrowLeft, Cart, Location2, LogoPersian, Rule, Wallet } from 'icons'

import { formatNumber, roles } from 'utils'

import { useAppDispatch, useAppSelector, useUserInfo } from 'hooks'

import type { NextPage } from 'next'
import type { WithAddressModalProps } from 'types'

const ShippingPage: NextPage = () => {
  const { push } = useRouter()

  // ? Get UserInfo
  const { userInfo } = useUserInfo()

  // ? Assets
  const dispatch = useAppDispatch()

  // ? States
  const [paymentMethod, setPaymentMethod] = useState('پرداخت در محل')

  // ? Store
  const { cartItems, totalItems, totalDiscount, totalPrice } = useAppSelector((state) => state.cart)

  // ? Create Order Query
  const [postData, { data, isSuccess, isError, isLoading, error }] = useCreateOrderMutation()

  // ? Handlers
  const handleCreateOrder = () => {
    if (
      !userInfo?.address?.city &&
      !userInfo?.address?.province &&
      !userInfo?.address?.street &&
      !userInfo?.address?.postalCode
    )
      return dispatch(
        showAlert({
          status: 'error',
          title: 'لطفا آدرس خود را تکمیل کنید',
        })
      )
    else
      postData({
        body: {
          address: {
            city: userInfo.address.city.name,
            postalCode: userInfo.address.postalCode,
            provinces: userInfo.address.province.name,
            street: userInfo.address.street,
          },
          mobile: userInfo.mobile,
          cart: cartItems,
          totalItems,
          totalPrice,
          totalDiscount,
          paymentMethod,
        },
      })
  }

  // ? Local Components
  const ChangeAddress = () => {
    const BasicChangeAddress = ({ addressModalProps }: { addressModalProps?: WithAddressModalProps | null }) => {
      const { openAddressModal } = addressModalProps || {}
      return (
        <button type="button" onClick={openAddressModal} className="mr-auto flex items-center">
          <span className="text-base text-sky-600">تغییر | ویرایش</span>
          <ArrowLeft className="icon text-sky-600" />
        </button>
      )
    }

    return (
      <WithAddressModal>
        <BasicChangeAddress />
      </WithAddressModal>
    )
  }

  // ? Render(s)
  return (
    <RequireUser allowedRoles={[roles.ADMIN, roles.ROOT, roles.USER]}>
      {/*  Handle Create Order Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.msg}
          onSuccess={() => {
            dispatch(clearCart())
            push('/profile')
          }}
        />
      )}

      <main className="mx-auto space-y-3 py-2 lg:max-w-7xl lg:px-5 lg:py-10">
        <Head>
          <title>دیجی‌کالا | پرداخت</title>
        </Head>
        {/* header */}
        <header className="lg:rounded-lg lg:border lg:border-gray-200">
          <Link href="/">
            <LogoPersian className="mx-auto h-12 w-24" />
          </Link>
          <div className="flex items-center justify-evenly">
            <Link href="/checkout/cart" className="flex flex-col items-center gap-y-2">
              <Cart className="icon text-red-400" />
              <span className="font-normal text-red-400">سبد خرید</span>
            </Link>

            <div className="h-[1px] w-8  bg-red-400" />
            <div className="flex flex-col items-center gap-y-2">
              <Wallet className="icon h-6 w-6 text-red-600" />
              <span className="text-base font-normal text-red-600">پرداخت</span>
            </div>
          </div>
        </header>

        <div className="section-divide-y lg:hidden" />

        <div className="lg:flex lg:gap-x-3">
          <div className="lg:flex-1">
            {/* address */}
            <section className="flex items-center gap-x-3 px-3 py-4 lg:rounded-lg lg:border lg:border-gray-200">
              <Location2 className="h-7 w-7 text-black" />
              <div className="space-y-2">
                <span className="">آدرس تحویل سفارش</span>
                <p className="text-base text-black">{userInfo?.address?.street}</p>
                <span className="text-sm">{userInfo?.name}</span>
              </div>
              <ChangeAddress />
            </section>

            <div className="section-divide-y lg:hidden" />

            {/* products */}
            <section className="mx-3 rounded-lg border border-gray-200 px-2 py-4 lg:mx-0 lg:mt-3 ">
              <div className="mb-5 flex">
                <Image src="/icons/car.png" className="ml-4" width={40} height={40} alt="ارسال" />
                <div>
                  <span className="text-base text-black">ارسال عادی</span>
                  <span className="block">موجود در انبار</span>
                </div>
                <span className="farsi-digits mr-3 inline-block h-fit rounded-lg bg-gray-300 px-2 py-1">
                  {formatNumber(totalItems)} کالا
                </span>
              </div>
              <div className="flex flex-wrap justify-start gap-x-8 gap-y-5">
                {cartItems.map((item) => (
                  <article key={item.itemID}>
                    <ResponsiveImage
                      dimensions="w-28 h-28"
                      src={item.img.url}
                      blurDataURL={item.img.placeholder}
                      alt={item.name}
                    />

                    {item.color && (
                      <div className="mr-3 mt-1.5 flex items-center gap-x-2">
                        <span
                          className="inline-block h-4 w-4 rounded-xl border border-gray-400 shadow"
                          style={{ background: item.color.hashCode }}
                        />
                        <span>{item.color.name}</span>
                      </div>
                    )}

                    {item.size && (
                      <div className="flex items-center gap-x-2">
                        <Rule className="icon" />
                        <span>{item.size.size}</span>
                      </div>
                    )}
                  </article>
                ))}
              </div>

              <Link href="/checkout/cart" className="mt-6 inline-block text-sm text-sky-600">
                بازگشت به سبد خرید
              </Link>
            </section>
          </div>

          <div className="section-divide-y lg:hidden" />

          {/* cart info */}
          <section className="lg:h-fit lg:rounded-md lg:border lg:border-gray-200">
            <div className="lg:rounded-md lg:border lg:border-gray-300">
              <CartInfo />
            </div>
            <div className="space-y-3 px-3 py-2">
              <div className="flex items-center gap-x-2 ">
                <input
                  type="radio"
                  name="cash"
                  id="cash"
                  value="پرداخت در محل"
                  checked={paymentMethod === 'پرداخت در محل'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="text-sm" htmlFor="cash">
                  پرداخت در محل
                </label>
              </div>
              <div className="flex items-center gap-x-2 ">
                <input
                  type="radio"
                  name="zarinPal"
                  id="zarinPal"
                  value="زرین پال"
                  disabled={true}
                  checked={paymentMethod === 'زرین پال'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="text-sm" htmlFor="zarinPal">
                  زرین پال (بزودی)
                </label>
              </div>
              <Button onClick={handleCreateOrder} isLoading={isLoading} className="mx-auto w-full max-w-5xl">
                نهایی کردن خرید
              </Button>
            </div>
          </section>
        </div>
      </main>
    </RequireUser>
  )
}

export default dynamic(() => Promise.resolve(ShippingPage), { ssr: false })
