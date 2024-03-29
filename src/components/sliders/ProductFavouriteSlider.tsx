import Link from 'next/link'

import { useGetProductsQuery } from '@/services'

import { Heart, Star } from '@/icons'
import { ProductDiscountTag, ProductPriceDisplay } from '@/components/product'
import { Skeleton, ResponsiveImage } from '@/components/ui'

interface Props {
  categorySlug: string
}

const ProductFavouriteSlider: React.FC<Props> = (props) => {
  // ? Props
  const { categorySlug } = props

  const { products, isFetching } = useGetProductsQuery(
    {
      sort: 5,
      category: categorySlug,
    },
    {
      selectFromResult: ({ data, isFetching }) => ({
        products: data?.products,
        isFetching,
      }),
    }
  )

  // ? Render(s)

  return (
    <section className="px-3">
      <div className="mb-3 flex items-center gap-x-2">
        <Heart className="icon text-amber-400" />
        <h4 className="text-xl">محبوب ترین کالاها</h4>
      </div>
      <div className="grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-2 lg:grid-cols-4 xl:grid-cols-5">
        {isFetching
          ? Array(10)
              .fill('_')
              .map((_, index) => (
                <Skeleton.Items key={index} className="p-1">
                  <Skeleton.Item
                    height="h-32 md:h-36"
                    width="w-28 md:w-32"
                    animated="background"
                    className="mx-auto rounded-md"
                  />
                  <Skeleton.Item height="h-5" width="w-32" animated="background" className="mx-auto mt-4" />
                  <Skeleton.Item height="h-5" width="w-20" animated="background" className="mx-auto mt-4" />
                </Skeleton.Items>
              ))
          : products?.map((product) => (
              <Link key={product._id} href={`/products/${product.slug}`}>
                <article className="min-h-[248px] border border-gray-50 p-1 transition hover:border-gray-200">
                  <div className="flex gap-x-1 ">
                    <span className="farsi-digits text-base">{product.rating.toFixed(1)}</span>
                    <Star className="h-5 w-5 text-amber-400 md:h-7 md:w-7 " />
                  </div>

                  <ResponsiveImage
                    dimensions="h-32 w-28 md:w-32 md:h-36"
                    className="mx-auto"
                    src={product.images[0].url}
                    blurDataURL={product.images[0].placeholder}
                    alt={product.title}
                    imageStyles="object-contain"
                  />
                  <div
                    className={`mt-2 flex items-start gap-x-2 ${
                      product.discount ? 'justify-evenly' : 'justify-end pl-8'
                    }`}
                  >
                    {product.discount ? <ProductDiscountTag discount={product.discount} /> : null}
                    <ProductPriceDisplay inStock={product.inStock} discount={product.discount} price={product.price} />
                  </div>
                </article>
              </Link>
            ))}
      </div>
    </section>
  )
}

export default ProductFavouriteSlider
