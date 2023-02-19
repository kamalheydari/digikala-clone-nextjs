import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import { formatNumber } from "utils/formatNumber";
import { openModal } from "app/slices/modal.slice";

import {
  ArrowLink,
  CartItem,
  RedirectToLogin,
  Button,
  CartTotalItems,
  Toman,
} from "components";

import useUserInfo from "hooks/useUserInfo";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function CartDropdown() {
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

      <Menu as='div' className='cart-dropdown'>
        <Menu.Button>
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
            className='cart-dropdown__items
       '
          >
            {totalItems > 0 && (
              <>
                {/* Header */}
                <div className='cart-dropdown__content__header'>
                  <span>{totalItems} کالا</span>
                  <ArrowLink path='/checkout/cart'>مشاهده‌ی سبد خرید</ArrowLink>
                </div>
                {/* Itmes */}
                <div className='overflow-y-auto h-80'>
                  {cartItems.map((item) => (
                    <CartItem item={item} key={item.itemID} />
                  ))}
                </div>
                {/* Footer */}
                <div className='cart-dropdown__content__footer'>
                  <div>
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
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}
