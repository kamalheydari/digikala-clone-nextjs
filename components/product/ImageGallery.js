import Image from 'next/image'
import { SpecialSell } from 'components'
import { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper'

export default function ImageGallery({
  images,
  discount,
  inStock,
  productName,
}) {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <section className='mb-5 lg:col-span-3 '>
      <div className='hidden lg:block'>
        <SpecialSell discount={discount} inStock={inStock} />
        <div className='relative lg:h-[320px] lg:w-[320px] xl:h-[420px] xl:w-[420px] 2xl:h-[500px] 2xl:w-[500px] mx-auto'>
          <Image
            src={images[currentImage].url}
            layout='fill'
            alt={productName}
            placeholder='blur'
            blurDataURL='/placeholder.png'
          />
        </div>
        <div className='flex mt-5 gap-x-3'>
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative h-24 w-24 cursor-pointer border-2 border-transparent rounded-md overflow-hidden ${
                index === currentImage && 'border-gray-300 shadow-3xl'
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image.url}
                layout='fill'
                alt={productName}
                placeholder='blur'
                blurDataURL='/placeholder.png'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='lg:hidden'>
        <Swiper pagination={true} modules={[Pagination]} className='mySwiper'>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='relative h-[95vw] w-full'>
                <Image
                  src={image.url}
                  layout='fill'
                  placeholder='blur'
                  blurDataURL='/placeholder.png'
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
