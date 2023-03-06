import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import { formatNumber } from 'utils/formatNumber'

import {
  ArrowLink,
  CartItem,
  RedirectToLogin,
  Button,
  CartTotalItems,
  Toman,
  EmptyCart,
} from 'components'

import useUserInfo from 'hooks/useUserInfo'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import useDisclosure from 'hooks/useDisclosure'

export default function CartDropdown() {
  //? Assets
  const router = useRouter()

  const { isVerify } = useUserInfo()

  const [isShowRedirectModal, redirectModalHandlers] = useDisclosure()

  //? Store
  const { totalItems, cartItems, totalDiscount, totalPrice } = useSelector(
    (state) => state.cart
  )

  //? Handlers
  const handleRoute = () => {
    if (!isVerify) return redirectModalHandlers.open()

    router.push('/checkout/shipping')
  }

  return (
    <>
      <RedirectToLogin
        title='شما هنوز وارد نشدید'
        text=''
        onClose={redirectModalHandlers.close}
        isShow={isShowRedirectModal}
      />

      <Menu as='div' className='dropdown'>
        <Menu.Button className='dropdown__button'>
          <CartTotalItems />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items
            className='dropdown__items w-[440px]
       '
          >
            {totalItems > 0 ? (
              <>
                {/* Header */}
                <div className='flex items-center justify-between px-3 py-4'>
                  <span className='farsi-digits'>{totalItems} کالا</span>
                  <ArrowLink path='/checkout/cart'>مشاهده‌ی سبد خرید</ArrowLink>
                </div>
                {/* Itmes */}
                <div className='divide-y divide-gray-50 overflow-y-auto h-80 mx-1'>
                  {cartItems.map((item) => (
                    <CartItem item={item} key={item.itemID} />
                  ))}
                </div>
                {/* Footer */}
                <div className='px-3 py-2 flex justify-between items-center border-t'>
                  <div>revie
                    <span>مبلغ قابل پرداخت</span>
                    <div className='flex-center'>
                      <span className='text-sm farsi-digits'>
                        {formatNumber(totalPrice - totalDiscount)}
                      </span>
                      <Toman className='mr-1 w-7 h-7' />
                    </div>
                  </div>

                  <Button onClick={handleRoute}>ثبت سفارش</Button>
                </div>
              </>
            ) : (
              <>
                <EmptyCart className='mx-auto h-44 w-44' />
                <p className='text-base font-bold text-center pt-2'>
                  سبد خرید شما خالی است!
                </p>
              </>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
