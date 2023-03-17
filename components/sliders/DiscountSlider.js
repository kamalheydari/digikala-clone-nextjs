import Link from 'next/link'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { AmazingTypo, DiscountProduct, ProductPrice } from 'components'

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
          <SwiperSlide className='py-10 '>
            <AmazingTypo className='w-20 h-20 mx-auto' />
            <div className='relative w-20 h-20 mx-auto'>
              <Image
                src={currentCategory.image}
                layout='fill'
                alt='icon'
                placeholder='blur'
                blurDataURL='/placeholder.png'
              />
            </div>
          </SwiperSlide>
          {discountProducts.products.map((product, index) => (
            <SwiperSlide
              key={product._id}
              className={`w-fit  bg-white mx-0.5 py-6 ${
                index === 0 ? 'rounded-r-lg' : index === 9 ? 'rounded-l-lg' : ''
              } `}
            >
              <Link href={`/products/${product._id}`}>
                <a>
                  <article>
                    <div className='relative w-32 h-32 mx-auto lg:w-36 lg:h-36'>
                      <Image
                        src={product.images[0].url}
                        layout='fill'
                        alt={product.title}
                        placeholder='blur'
                        blurDataURL='/placeholder.png'
                      />
                    </div>
                    <div className='flex px-2 justify-evenly gap-x-2 '>
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
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    )
  } else return null
}
