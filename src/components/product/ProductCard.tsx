import { truncate } from '@/utils'

import { Plus, Star } from '@/icons'
import { ResponsiveImage } from '@/components/ui'
import {
  ProductDiscountTag,
  ProductSpecialOffer,
  ProductPriceDisplay,
  ProductStockIndicator,
} from '@/components/product'

import type { IProduct } from '@/types'

interface Props {
  product: Pick<
    IProduct,
    '_id' | 'colors' | 'discount' | 'images' | 'inStock' | 'price' | 'rating' | 'sold' | 'title' | 'slug'
  >
  slide?: boolean
}

const ProductCard: React.FC<Props> = (props) => {
  // ? Props
  const { product, slide } = props

  // ? Render(s)
  return (
    <a target="_blank" href={`/products/${product.slug}`} className="block">
      <article
        className={`pb-3 pt-2 sm:h-[540px] sm:px-3 xl:h-[470px] ${
          !slide ? 'border-gray-200 sm:border sm:hover:shadow-3xl' : 'border-l border-gray-300'
        }`}
      >
        <ProductSpecialOffer discount={product.discount} inStock={product.inStock} />
        <div className="flex items-center gap-4 sm:flex-col">
          <div className="sm:flex sm:p-1 ">
            <ResponsiveImage
              dimensions="h-[28vw] w-[26vw] sm:w-56 sm:h-60 sm:mb-8 xl:w-44 xl:h-48"
              src={product.images[0].url}
              alt={product.title}
              blurDataURL={product.images[0].placeholder}
              imageStyles="object-contain"
            />

            <div className="flex items-center gap-1.5 p-2 sm:flex-col sm:items-end">
              {product.colors &&
                product.inStock !== 0 &&
                product.colors
                  .slice(0, 3)
                  .map((color) => (
                    <span
                      key={color.id}
                      className="inline-block h-2.5 w-2.5 rounded-xl border border-gray-300 shadow "
                      style={{ background: color.hashCode }}
                    ></span>
                  ))}
              {product.colors.length > 3 && product.inStock !== 0 && <Plus className="mr-1 h-3 w-3 sm:mr-0" />}
            </div>
          </div>
          <div className="flex-1 space-y-5 sm:w-full">
            <h2 className="hidden h-14 break-all text-xs leading-6 text-gray-800 xl:block">
              {truncate(product.title, 70)}
            </h2>
            <h2 className="h-14 text-xs leading-6 text-gray-800 xl:hidden">{truncate(product.title, 90)}</h2>
            <div className="flex justify-between">
              <div>
                <ProductStockIndicator inStock={product.inStock} />
              </div>
              <div className="flex items-center gap-x-1">
                <span className="farsi-digits">{product.rating.toFixed(1)}</span>
                <Star className="icon text-amber-400" />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                {product.discount > 0 && product.inStock !== 0 && <ProductDiscountTag discount={product.discount} />}
              </div>
              {product.inStock !== 0 ? (
                <ProductPriceDisplay inStock={product.inStock} discount={product.discount} price={product.price} />
              ) : (
                <span className="my-0.5 h-12">ناموجود</span>
              )}
            </div>
          </div>
        </div>
      </article>
    </a>
  )
}

export default ProductCard
