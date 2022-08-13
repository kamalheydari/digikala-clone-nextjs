import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "app/slices/cart.slice";
import { showAlert } from "app/slices/alert.slice";

import exsitItem from "utils/exsitItem";

import { ArrowLink, ProductPrice, CartButtons } from "components";

export default function AddToCart({ product, color, size }) {
  const dispatch = useDispatch();

  //? Local State
  const [currentItemInCart, setCurrentItemInCart] = useState(null);

  //? Store
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    setCurrentItemInCart(exsitItem(cartItems, product._id, color, size));
  }, [size, color, cartItems]);

  //? handlers
  const handleAddItem = () => {
    if (product.inStock === 0)
      return dispatch(
        showAlert({
          status: "error",
          title: "موجودی این محصول به اتمام رسیده",
        })
      );

    dispatch(
      addToCart({
        productID: product._id,
        name: product.title,
        price: product.price,
        discount: product.discount,
        inStock: product.inStock,
        sold: product.sold,
        color,
        size,
        img: product.images[0],
        quantity: 1,
      })
    );
  };

  if (product.inStock !== 0)
    return (
      <div className='fixed bottom-0 left-0 right-0 z-20 flex items-baseline justify-between px-3 py-4 bg-white border-t border-gray-300 sm:px-5 lg:py-3 lg:p-0 shadow-3xl lg:sticky lg:flex-col-reverse lg:top-32 lg:bg-gray-100 lg:gap-y-4 lg:border-t-0 lg:shadow-none'>
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
          <button
            onClick={handleAddItem}
            className='px-12 text-sm btn lg:w-full'
          >
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
    );

  return null;
}
