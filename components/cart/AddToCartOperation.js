import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart, showAlert } from 'store'

import { exsitItem } from 'utils'

import { ArrowLink, ProductPrice, CartButtons } from 'components'

export default function AddToCartOperation(props) {
  //? Props
  const { product } = props

  //? Assets
  const dispatch = useDispatch()

  //? Store
  const { cartItems, tempColor, tempSize } = useSelector((state) => state.cart)

  //? State
  const [currentItemInCart, setCurrentItemInCart] = useState(null)

  //? Re-Renders
  useEffect(() => {
    setCurrentItemInCart(exsitItem(cartItems, product._id, tempColor, tempSize))
  }, [tempColor, tempSize, cartItems])

  //? handlers
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

  //? Render(s)
  return (
    <div className='flex items-center justify-between p-3 bg-white border-t border-gray-300 sm:px-5 lg:py-3 lg:p-0 shadow-3xl lg:sticky lg:flex-col-reverse lg:top-32 lg:bg-gray-100 lg:gap-y-4 lg:border-t-0 lg:shadow-none'>
      {currentItemInCart ? (
        <div className='flex w-full gap-x-4'>
          <div className='w-44 lg:w-1/2 '>
            <CartButtons item={currentItemInCart} />
          </div>
          <div className='hidden lg:block'>
            <ArrowLink path='/checkout/cart'>مشاهده سبد خرید</ArrowLink>
          </div>
        </div>
      ) : (
        <button onClick={handleAddItem} className='px-12 text-sm lg:w-full btn'>
          افزودن به سبد
        </button>
      )}

      <div className='lg:self-end min-w-fit'>
        <ProductPrice
          inStock={product.inStock}
          discount={product.discount}
          price={product.price}
          singleProduct
        />
      </div>
    </div>
  )
}
