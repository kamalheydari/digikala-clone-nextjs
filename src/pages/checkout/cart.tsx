import { Fragment } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { clearCart } from '@/store'

import { Delete, EmptyCart, More, Toman } from '@/icons'
import { Menu, Transition } from '@headlessui/react'
import { CartItemDisplay, CartSummary, FreeShippingIndicator } from '@/components/cart'
import { RedirectToLogin } from '@/components/modals'
import { Button } from '@/components/ui'
import { Header } from '@/components/shared'

import { formatNumber } from '@/utils'

import { useDisclosure, useAppSelector, useAppDispatch, useUserInfo } from '@/hooks'

import type { NextPage } from 'next'

const Cart: NextPage = () => {
  // ? Assets
  const dispatch = useAppDispatch()
  const { push } = useRouter()

  const [isShowRedirectModal, redirectModalHandlers] = useDisclosure()

  // ? Get UserInfo
  const { userInfo } = useUserInfo()

  // ? Store
  const { cartItems, totalItems, totalPrice, totalDiscount } = useAppSelector((state) => state.cart)

  // ? Handlers
  const handleRoute = () => {
    if (!userInfo) return redirectModalHandlers.open()

    push('/checkout/shipping')
  }

  // ? Local Components
  const DeleteAllDropDown = () => (
    <Menu as="div" className="dropdown">
      <Menu.Button className="dropdown__button">
        <More className="icon" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="dropdown__items w-32 ">
          <Menu.Item>
            <button onClick={() => dispatch(clearCart())} className="flex-center gap-x-2 px-4 py-3">
              <Delete className="icon" />
              <span>حذف همه</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )

  // ? Render(s)
  if (cartItems.length === 0)
    return (
      <>
        <Header />
        <section className="mx-auto mb-20 space-y-3 py-2 lg:mb-0 lg:mt-6 lg:max-w-7xl lg:space-y-0 lg:rounded-md lg:border lg:border-gray-200 lg:px-5 lg:py-4 xl:mt-36">
          <Head>
            <title>دیجی‌کالا | سبد خرید</title>
          </Head>
          <div className="section-divide-y" />

          <div className="py-20">
            <EmptyCart className="mx-auto h-52 w-52" />
            <p className="text-center text-base font-bold">سبد خرید شما خالی است!</p>
          </div>
        </section>
      </>
    )

  return (
    <>
      <RedirectToLogin
        title="شما هنوز وارد نشدید"
        text=""
        onClose={redirectModalHandlers.close}
        isShow={isShowRedirectModal}
      />
      <Header />
      <main className="mx-auto mb-20 space-y-3 py-2 lg:mb-0 lg:mt-6 lg:flex lg:max-w-7xl lg:flex-wrap lg:gap-x-3 lg:space-y-0 lg:px-5 lg:py-0 xl:mt-36">
        <Head>
          <title>دیجی‌کالا | سبد خرید</title>
        </Head>

        <div className="h-fit lg:flex-1 lg:rounded-md lg:border lg:border-gray-200 lg:py-4">
          {/* title */}
          <section className="flex justify-between px-4">
            <div>
              <h3 className="mb-2 text-sm font-bold">سبد خرید شما</h3>
              <span className="farsi-digits">{formatNumber(totalItems)} کالا</span>
            </div>
            <DeleteAllDropDown />
          </section>

          {/* carts */}
          <section className="divide-y">
            {cartItems.map((item) => (
              <CartItemDisplay item={item} key={item.itemID} />
            ))}
          </section>
        </div>

        <div className="section-divide-y lg:hidden" />

        {/* cart Info */}
        <section className="lg:sticky lg:top-6 lg:h-fit xl:top-36">
          <div className="lg:rounded-md lg:border lg:border-gray-200">
            <CartSummary handleRoute={handleRoute} cart />
          </div>
          <FreeShippingIndicator />
        </section>

        {/* to Shipping */}
        <section className="fixed inset-x-0 bottom-0 z-10 flex items-center justify-between border-t border-gray-300 bg-white p-3 shadow-3xl lg:hidden">
          <Button className="w-1/2" onClick={handleRoute}>
            ادامه
          </Button>
          <div>
            <span className="font-light">جمع سبد خرید</span>
            <div className="flex items-center">
              <span className="farsi-digits text-sm">{formatNumber(totalPrice - totalDiscount)}</span>
              <Toman className="mr-1 h-7 w-7" />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false })
