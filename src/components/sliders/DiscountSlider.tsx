import Link from 'next/link'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { useGetProductsQuery } from '@/services'

import { AmazingTypo } from '@/icons'

import { ProductDiscountTag, ProductPriceDisplay } from '@/components/product'
import { ResponsiveImage, Skeleton } from '@/components/ui'

import type { ICategory } from '@/types'

interface Props {
  currentCategory: ICategory
}

const DiscountSlider: React.FC<Props> = (props) => {
  // ? Props
  const { currentCategory } = props

  const { products, isFetching } = useGetProductsQuery(
    {
      sort: 6,
      category: currentCategory?.slug,
      page_size: 15,
      discount: true,
    },
    {
      selectFromResult: ({ data, isFetching }) => ({
        products: data?.products,
        isFetching,
      }),
    }
  )

  // ? Render(s)

  if (currentCategory) {
    return (
      <section
        className="flex py-2.5 lg:mx-3 lg:rounded-xl lg:px-1"
        style={{
          background: `linear-gradient(${`${currentCategory.colors?.start},${currentCategory.colors?.end}`})`,
        }}
      >
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={2}
          breakpoints={{
            490: { width: 490, slidesPerView: 3 },
          }}
        >
          <SwiperSlide className="flex-center flex-col py-10">
            <AmazingTypo className="h-20 w-20" />
            <ResponsiveImage
              src={currentCategory.image.url}
              blurDataURL={currentCategory.image.placeholder}
              alt={currentCategory.name}
              dimensions="w-24 h-24"
              priority
            />
          </SwiperSlide>

          {isFetching
            ? Array(10)
                .fill('_')
                .map((_, index) => (
                  <SwiperSlide
                    key={index}
                    className={`mx-0.5  w-fit bg-white py-6 ${
                      index === 0 ? 'rounded-r-lg' : index === 9 ? 'rounded-l-lg' : ''
                    } `}
                  >
                    <Skeleton.Items>
                      <Skeleton.Item
                        height="h-32 lg:h-36"
                        width="w-32 lg:w-36"
                        animated="background"
                        className="mx-auto rounded-md"
                      />
                      <Skeleton.Item height="h-5" width="w-32" animated="background" className="mx-auto mt-4" />
                      <Skeleton.Item height="h-5" width="w-20" animated="background" className="mx-auto mt-4" />
                    </Skeleton.Items>
                  </SwiperSlide>
                ))
            : products?.map((product, index) => (
                <SwiperSlide
                  key={product._id}
                  className={`mx-0.5 w-fit bg-white py-6 ${
                    index === 0 ? 'rounded-r-lg' : index === 9 ? 'rounded-l-lg' : ''
                  } `}
                >
                  <Link href={`/products/${product.slug}`} className="space-y-6">
                    <ResponsiveImage
                      dimensions="w-32 h-32 lg:w-36 lg:h-36"
                      className="mx-auto"
                      src={product.images[0].url}
                      blurDataURL={product.images[0].placeholder}
                      alt={product.title}
                      imageStyles="object-contain"
                    />

                    <div className="mt-1.5 flex justify-evenly gap-x-2 px-2 ">
                      <div>
                        <ProductDiscountTag discount={product.discount} />
                      </div>
                      <ProductPriceDisplay
                        inStock={product.inStock}
                        discount={product.discount}
                        price={product.price}
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
        </Swiper>
      </section>
    )
  }
}

export default DiscountSlider
