import Image from 'next/image'

import { useSelector } from 'react-redux'

import { AddToCartOperation, Depot, Icons, ResponsiveImage } from 'components'

import { formatNumber } from 'utils/formatNumber'

export default function AddToCart({ second, product }) {
  //? Store
  const { tempColor, tempSize } = useSelector((state) => state.cart)
  return (
    <>
      {/* mobile */}
      <div className='add-to-cart__mobile'>
        <AddToCartOperation product={product} />
      </div>

      {/* desktop */}
      <div
        className={`add-to-cart__desktop ${
          second ? 'lg:top-4 xl:top-32' : 'lg:top-60 xl:top-[260px]'
        } `}
      >
        <div className='add-to-cart__desktop__header'>
          <span className='text-base text-black'>فروشنده :</span>
          <div className='flex gap-x-2'>
            <Image
              src='/icons/mini-logo.png'
              width={24}
              height={24}
              alt='دیجی‌کالا'
            />
            <span>دیجی‌کالا</span>
          </div>
        </div>
        {second && (
          <>
            <div className='flex py-3 gap-x-4 '>
              <ResponsiveImage
                dimensions='w-28 h-28'
                src={product.images[0].url}
                alt={product.title}
              />

              <span className='flex-1 text-justify'>{product.title}</span>
            </div>

            {tempColor && (
              <div className='add-to-cart__desktop__item'>
                <span
                  className='inline-block w-5 h-5 shadow rounded-xl'
                  style={{ background: tempColor.hashCode }}
                />
                <span>{tempColor.name}</span>
              </div>
            )}
            {tempSize && (
              <div className='add-to-cart__desktop__item'>
                <Icons.Rule className='icon' />
                <span className='farsi-digits'>{tempSize.size}</span>
              </div>
            )}
          </>
        )}

        <div className='py-3 lg:items-center lg:gap-x-2 lg:flex'>
          <Icons.ShieldCheck className='icon' />
          <span className='font-light'>گارانتی اصالت و ضمانت تحویل</span>
        </div>

        <div className='lg:block lg:py-3 '>
          <Depot inStock={product.inStock} />
        </div>

        <div className='lg:flex lg:items-center lg:gap-x-1 lg:py-3'>
          <Icons.Check className='icon' />
          <span> فروش :</span>
          <span className='farsi-digits'>{formatNumber(product.sold)}</span>
        </div>

        <AddToCartOperation product={product} />
      </div>
    </>
  )
}
