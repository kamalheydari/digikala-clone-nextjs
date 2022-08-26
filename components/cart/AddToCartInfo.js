import Image from "next/image";

import { useSelector } from "react-redux";

import { AddToCart, Depot, Icons } from "components";

import { formatNumber } from "utils/formatNumber";

export default function AddToCartInfo({ second, product }) {
  //? Store
  const { tempColor, tempSize } = useSelector((state) => state.cart);
  return (
    <div
      className={`divide-y lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-5 lg:rounded-lg lg:bg-gray-100 lg:flex lg:flex-col   xl:row-end-5 lg:px-3 lg:py-1.5 lg:border lg:border-gray-200 lg:shadow lg:sticky ${
        second ? "lg:top-4 xl:top-32" : "lg:top-60 xl:top-[260px]"
      } `}
    >
      <div className='items-center justify-between hidden space-y-2 lg:py-3 lg:flex'>
        <span className='text-base text-black'>فروشنده :</span>
        <div className='flex gap-x-2'>
          <div className='relative w-6 h-6'>
            <Image src='/icons/mini-logo.png' layout='fill' alt='دیجی‌کالا' />
          </div>
          <span>دیجی‌کالا</span>
        </div>
      </div>
      {second && (
        <>
          <div className='flex py-3 gap-x-4 '>
            <div className='relative w-28 h-28'>
              <Image
                src={product.images[0].url}
                layout='fill'
                alt={product.title}
              />
            </div>
            <span className='flex-1 text-justify'>{product.title}</span>
          </div>

          {tempColor && (
            <div className='flex items-center gap-x-2 py-3'>
              <span
                className='inline-block w-5 h-5 shadow rounded-xl'
                style={{ background: tempColor.hashCode }}
              />
              <span>{tempColor.name}</span>
            </div>
          )}
          {tempSize && (
            <div className='flex items-center gap-x-2 py-3'>
              <Icons.Rule className='icon' />
              <span className='farsi-digits'>{tempSize.size}</span>
            </div>
          )}
        </>
      )}

      <div className='hidden py-3 lg:items-center lg:gap-x-2 lg:flex'>
        <Icons.ShieldCheck className='icon' />
        <span className='font-light'>گارانتی اصالت و ضمانت تحویل</span>
      </div>

      <div className='hidden lg:block lg:py-3 '>
        <Depot inStock={product.inStock} />
      </div>

      <div className='hidden lg:flex lg:items-center lg:gap-x-1 lg:py-3'>
        <Icons.Check className='icon' />
        <span> فروش :</span>
        <span className='farsi-digits'>{formatNumber(product.sold)}</span>
      </div>

      <AddToCart product={product} />
    </div>
  );
}