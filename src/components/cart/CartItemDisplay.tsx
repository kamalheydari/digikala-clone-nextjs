import Link from 'next/link'

import { formatNumber } from '@/utils'

import { Rule, Save, ShieldCheck, Toman } from '@/icons'
import { ProductSpecialOffer } from '@/components/product'
import { ResponsiveImage } from '@/components/ui'
import { CartItemActions, CartDiscountItem } from '@/components/cart'

import type { ICart } from '@/types'

interface Props {
  item: ICart
}

const CartItemDisplay: React.FC<Props> = (props) => {
  // ? Props
  const { item } = props

  // ? Render(s)
  return (
    <article className="flex gap-x-4 px-4 py-5 ">
      {/* image & CartItemActions */}
      <div className="space-y-4">
        <ResponsiveImage
          dimensions="w-28 h-28"
          src={item.img.url}
          blurDataURL={item.img.placeholder}
          alt={item.name}
          imageStyles="object-contain"
        />

        <div className="mx-auto w-fit ">
          <ProductSpecialOffer discount={item.discount} inStock={item.inStock} />
        </div>

        <CartItemActions item={item} />
      </div>

      {/* name */}
      <div>
        <h5 className="mb-3 text-sm">
          <Link href={`/products/${item.slug}`}>{item.name}</Link>
        </h5>

        {/* info */}
        <div className="space-y-3">
          {item.color && (
            <div className="flex items-center gap-x-2">
              <span className="inline-block h-5 w-5 rounded-xl shadow" style={{ background: item.color.hashCode }} />
              <span>{item.color.name}</span>
            </div>
          )}
          {item.size && (
            <div className="flex items-center gap-x-2">
              <Rule className="icon" />
              <span className="farsi-digits">{item.size.size}</span>
            </div>
          )}
          <div className="flex items-center gap-x-2">
            <ShieldCheck className="icon" />
            <span className="font-light">گارانتی اصالت و ضمانت تحویل</span>
          </div>
          <div className="flex items-center gap-x-2">
            <Save className="icon text-sky-400" />
            <span className="font-light">موجود در انبار دیجی کالا</span>
          </div>
          {item.discount > 0 ? (
            <CartDiscountItem discount={item.discount} price={item.price} />
          ) : (
            <div className="flex items-center gap-x-2">
              <span className="farsi-digits text-sm text-gray-700">{formatNumber(item.price)}</span>
              <Toman className="h-6 w-6" />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default CartItemDisplay
