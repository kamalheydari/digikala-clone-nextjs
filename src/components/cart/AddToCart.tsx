import Image from 'next/image'

import { AddToCartOperation, Depot, ResponsiveImage } from 'components'
import { Check, Rule, ShieldCheck } from 'icons'

import { formatNumber } from 'utils'

import { useAppSelector } from 'hooks'

import type { IProduct } from 'types'

interface Props {
  second?: boolean
  product: IProduct
}

const AddToCart: React.FC<Props> = (props) => {
  // ? Props
  const { second, product } = props

  // ? Store
  const { tempColor, tempSize } = useAppSelector((state) => state.cart)

  // ? Render(s)
  return (
    <>
      {/* mobile */}
      <div className="fixed inset-x-0 bottom-0 z-20 lg:hidden">
        <AddToCartOperation product={product} />
      </div>

      {/* desktop */}
      <div
        className={`hidden divide-y divide-gray-300/90 lg:sticky lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-5 lg:flex lg:flex-col lg:rounded-lg lg:border lg:border-gray-300 lg:bg-gray-300 lg:px-3 lg:py-1.5 lg:shadow-sm xl:row-end-5 ${
          second ? 'lg:top-4 xl:top-32' : 'lg:top-60 xl:top-[260px]'
        } `}
      >
        <div className=" hidden items-center justify-between space-y-2 lg:flex lg:py-3">
          <span className="text-base text-black">فروشنده :</span>
          <div className="flex gap-x-2">
            <Image src="/icons/mini-logo.png" width={24} height={24} alt="دیجی‌کالا" />
            <span>دیجی‌کالا</span>
          </div>
        </div>
        {second && (
          <>
            <div className="flex gap-x-4 py-3 ">
              <ResponsiveImage
                dimensions="w-28 h-28"
                src={product.images[0].url}
                blurDataURL={product.images[0].placeholder}
                alt={product.title}
              />

              <span className="flex-1 text-justify">{product.title}</span>
            </div>

            {tempColor && (
              <div className="flex items-center gap-x-2 py-3">
                <span
                  className="inline-block h-5 w-5 rounded-xl shadow-sm"
                  style={{ background: tempColor.hashCode }}
                />
                <span>{tempColor.name}</span>
              </div>
            )}
            {tempSize && (
              <div className="flex items-center gap-x-2 py-3">
                <Rule className="icon" />
                <span className="farsi-digits">{tempSize.size}</span>
              </div>
            )}
          </>
        )}

        <div className="py-3 lg:flex lg:items-center lg:gap-x-2">
          <ShieldCheck className="icon" />
          <span className="font-light">گارانتی اصالت و ضمانت تحویل</span>
        </div>

        <div className="lg:block lg:py-3 ">
          <Depot inStock={product.inStock} />
        </div>

        <div className="lg:flex lg:items-center lg:gap-x-1 lg:py-3">
          <Check className="icon" />
          <span> فروش :</span>
          <span className="farsi-digits">{formatNumber(product.sold)}</span>
        </div>

        <AddToCartOperation product={product} />
      </div>
    </>
  )
}

export default AddToCart
