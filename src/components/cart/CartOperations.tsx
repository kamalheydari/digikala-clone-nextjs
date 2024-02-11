import { useState, useEffect } from 'react'

import { addToCart, showAlert } from '@/store'

import { exsitItem } from '@/utils'

import { useAppDispatch, useAppSelector } from '@/hooks'

import { CartItemActions } from '@/components/cart'
import { ArrowLink } from '@/components/ui'
import { ProductPriceDisplay } from '@/components/product'

import type { IProduct, ICart } from '@/types'

interface Porps {
  product: IProduct
}

const CartOperations: React.FC<Porps> = (props) => {
  // ? Props
  const { product } = props

  // ? Assets
  const dispatch = useAppDispatch()

  // ? Store
  const { cartItems, tempColor, tempSize } = useAppSelector((state) => state.cart)

  // ? State
  const [currentItemInCart, setCurrentItemInCart] = useState<ICart | undefined>(undefined)

  // ? Re-Renders
  useEffect(() => {
    const item = exsitItem(cartItems, product._id, tempColor, tempSize)
    setCurrentItemInCart(item)
  }, [tempColor, tempSize, cartItems, product._id])

  // ? handlers
  const handleAddItem = () => {
    if (product.inStock === 0)
      return dispatch(
        showAlert({
          status: 'error',
          title: 'موجودی این محصول به اتمام رسیده',
        })
      )

    dispatch(
      addToCart({
        productID: product._id,
        name: product.title,
        slug: product.slug,
        price: product.price,
        discount: product.discount,
        inStock: product.inStock,
        sold: product.sold,
        color: tempColor,
        size: tempSize,
        img: product.images[0],
        quantity: 1,
      })
    )
  }

  // ? Render(s)
  return (
    <div className="flex items-center justify-between border-t border-gray-300 bg-white p-3 shadow-3xl sm:px-5 lg:sticky lg:top-32 lg:flex-col-reverse lg:gap-y-4 lg:border-t-0 lg:bg-gray-100 lg:p-0 lg:py-3 lg:shadow-none">
      {currentItemInCart ? (
        <div className="flex w-full gap-x-4">
          <div className="w-44 lg:w-1/2 ">
            <CartItemActions item={currentItemInCart} />
          </div>
          <div className="hidden lg:block">
            <ArrowLink path="/checkout/cart">مشاهده سبد خرید</ArrowLink>
          </div>
        </div>
      ) : (
        <button onClick={handleAddItem} className="btn px-12 text-sm lg:w-full">
          افزودن به سبد
        </button>
      )}

      <div className="min-w-fit lg:self-end">
        <ProductPriceDisplay
          inStock={product.inStock}
          discount={product.discount}
          price={product.price}
          singleProduct
        />
      </div>
    </div>
  )
}

export default CartOperations
