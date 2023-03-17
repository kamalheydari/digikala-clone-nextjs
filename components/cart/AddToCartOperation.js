import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart, showAlert } from 'store'

import exsitItem from 'utils/exsitItem'

import { ArrowLink, ProductPrice, CartButtons } from 'components'

export default function AddToCartOperation({ product }) {
  //? Assets
  const dispatch = useDispatch()

  //? Store
  const { tempColor, tempSize } = useSelector((state) => state.cart)
  const { cartItems } = useSelector((state) => state.cart)

  //? Local State
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

  return (
    <div className='add-to-cart-operation'>
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
