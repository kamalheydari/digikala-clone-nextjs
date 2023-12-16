import { useState, useEffect } from 'react'

import { addToCart, showAlert } from 'store'

import { exsitItem } from 'utils'

import { ArrowLink, ProductPrice, CartButtons } from 'components'

import { useAppDispatch, useAppSelector } from 'hooks'

import type { IProduct, ICart } from 'types'

interface Porps {
  product: IProduct
}

const AddToCartOperation: React.FC<Porps> = (props) => {
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
    <div className="flex items-center justify-between border-t border-gray-400/50 bg-white p-3 shadow-4xl sm:px-5 lg:sticky lg:top-32 lg:flex-col-reverse lg:gap-y-4 lg:border-gray-100 lg:bg-gray-300 lg:p-0 lg:py-3 lg:shadow-none">
      {currentItemInCart ? (
        <div className="flex w-full gap-x-4">
          <div className="w-44 lg:w-1/2 ">
            <CartButtons item={currentItemInCart} />
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
        <ProductPrice inStock={product.inStock} discount={product.discount} price={product.price} singleProduct />
      </div>
    </div>
  )
}

export default AddToCartOperation
