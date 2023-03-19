import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import {
  AmazingTypo,
  DiscountProduct,
  ProductPrice,
  ResponsiveImage,
} from 'components'

export default function DiscountSlider(props) {
  //? Props
  const { discountProducts, currentCategory } = props

  //? Render(s)
  if (discountProducts.products.length > 0 && currentCategory) {
    return (
      <section
        className='lg:rounded-xl lg:mx-3 py-2.5 flex lg:px-1'
        style={{
          background: `linear-gradient(${`${currentCategory.colors.start},${currentCategory.colors.end}`})`,
        }}
      >
        <Swiper
          watchSlidesProgress={true}
          slidesPerView={2}
          breakpoints={{
            490: { width: 490, slidesPerView: 3 },
          }}
        >
          <SwiperSlide className='py-10 flex-center flex-col'>
            <AmazingTypo className='w-20 h-20' />
            <Image
              src={currentCategory.image}
              alt={currentCategory.name}
              width={96}
              height={96}
              priority
            />
          </SwiperSlide>
          {discountProducts.products.map((product, index) => (
            <SwiperSlide
              key={product._id}
              className={`w-fit  bg-white mx-0.5 py-6 ${
                index === 0 ? 'rounded-r-lg' : index === 9 ? 'rounded-l-lg' : ''
              } `}
            >
              <Link href={`/products/${product._id}`}>
                <article>
                  <ResponsiveImage
                    dimensions='w-32 h-32 lg:w-36 lg:h-36'
                    className=' mx-auto'
                    src={product.images[0].url}
                    alt={product.title}
                  />

                  <div className='flex px-2 mt-1.5 justify-evenly gap-x-2 '>
                    <div>
                      <DiscountProduct discount={product.discount} />
                    </div>
                    <ProductPrice
                      inStock={product.inStock}
                      discount={product.discount}
                      price={product.price}
                    />
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    )
  } else return null
}
