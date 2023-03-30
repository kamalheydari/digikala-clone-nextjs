import Link from 'next/link'

import { formatNumber } from 'utils'

import {
  SpecialSell,
  CartButtons,
  Icons,
  DiscountCartItem,
  Toman,
  ResponsiveImage,
} from 'components'

export default function CartItem(props) {
  //? Props
  const { item } = props

  //? Render(s)
  return (
    <article className='flex px-4 py-5 gap-x-4 '>
      {/* image & cartButtons */}
      <div className='space-y-4'>
        <ResponsiveImage
          dimensions='w-28 h-28'
          src={item.img.url}
          alt={item.name}
        />

        <div className='mx-auto w-fit '>
          <SpecialSell product={item} />
        </div>

        <CartButtons item={item} />
      </div>

      {/* name */}
      <div>
        <h5 className='mb-3 text-sm'>
          <Link href={`/products/${item.productID}`}>{item.name}</Link>
        </h5>

        {/* info */}
        <div className='space-y-3'>
          {item.color && (
            <div className='flex items-center gap-x-2'>
              <span
                className='inline-block w-5 h-5 shadow rounded-xl'
                style={{ background: item.color.hashCode }}
              />
              <span>{item.color.name}</span>
            </div>
          )}
          {item.size && (
            <div className='flex items-center gap-x-2'>
              <Icons.Rule className='icon' />
              <span className='farsi-digits'>{item.size.size}</span>
            </div>
          )}
          <div className='flex items-center gap-x-2'>
            <Icons.ShieldCheck className='icon' />
            <span className='font-light'>گارانتی اصالت و ضمانت تحویل</span>
          </div>
          <div className='flex items-center gap-x-2'>
            <Icons.Save className='icon text-sky-400' />
            <span className='font-light'>موجود در انبار دیجی کالا</span>
          </div>
          {item.discount > 0 ? (
            <DiscountCartItem item={item} />
          ) : (
            <div className='flex items-center gap-x-2'>
              <span className='text-sm text-gray-700 farsi-digits'>
                {formatNumber(item.price)}
              </span>
              <Toman className='w-6 h-6' />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
