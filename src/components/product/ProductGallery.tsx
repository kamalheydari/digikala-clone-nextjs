/* eslint-disable tailwindcss/no-custom-classname */
import { useState } from 'react'

import { ResponsiveImage } from 'components/ui'
import { ProductSpecialOffer } from 'components/product'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

interface Props {
  images: {
    url: string
    placeholder: string
    id: string
  }[]
  discount: number
  inStock: number
  productName: string
}

const ProductGallery: React.FC<Props> = (props) => {
  // ? Porps
  const { images, discount, inStock, productName } = props

  // ? States
  const [currentImage, setCurrentImage] = useState(0)

  // ? Render(s)
  return (
    <section className="mb-5 lg:col-span-3 ">
      <div className="hidden lg:block">
        <ProductSpecialOffer discount={discount} inStock={inStock} />
        <ResponsiveImage
          dimensions="lg:h-[320px] lg:w-[320px] xl:h-[420px] xl:w-[420px] 2xl:h-[500px] 2xl:w-[500px]"
          className="mx-auto"
          imageStyles="object-contain"
          src={images[currentImage].url}
          blurDataURL={images[currentImage].placeholder}
          alt={productName}
        />

        <div className="mt-5 flex gap-x-3">
          {images.map((image, index) => (
            <ResponsiveImage
              key={index}
              dimensions="h-24 w-24"
              className={`relative h-24 w-24 cursor-pointer overflow-hidden rounded-md border-2 border-transparent ${
                index === currentImage && 'border-gray-300 shadow-3xl'
              }`}
              imageStyles="object-contain"
              onClick={() => setCurrentImage(index)}
              src={image.url}
              blurDataURL={image.placeholder}
              alt={productName}
            />
          ))}
        </div>
      </div>
      <div className="lg:hidden">
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <ResponsiveImage
                dimensions="h-[95vw] w-full"
                src={image.url}
                blurDataURL={image.placeholder}
                alt={productName}
                imageStyles="object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default ProductGallery
