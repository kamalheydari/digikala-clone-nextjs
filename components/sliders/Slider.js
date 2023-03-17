import Image from 'next/image'

import { useGetSingleSliderQuery } from 'services'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import { Skeleton } from 'components'

export default function Slider({ id }) {
  //? Get Data
  const { data, isLoading } = useGetSingleSliderQuery({
    id,
  })

  if (isLoading) {
    return (
      <Skeleton.Item
        animated='background'
        height='h-52 md:h-70 lg:h-[370px]'
        width='w-full'
      />
    )
  } else if (data?.sliders && data.sliders.length > 0) {
    return (
      <section>
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            loop: true,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className='mySwiper'
        >
          {data.sliders
            .filter((item) => item.public)
            .map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className='relative w-full h-52 md:h-70 lg:h-[370px]
                  '
                  title={item.title}
                >
                  {item.uri.length > 0 ? (
                    <a href={item.uri} target='_blank'>
                      <Image
                        className='object-cover object-[70%] lg:object-center'
                        src={item.image.url}
                        layout='fill'
                        alt={item.title}
                        placeholder='blur'
                        blurDataURL='/placeholder.png'
                      />
                    </a>
                  ) : (
                    <Image
                      className='object-cover object-[70%] lg:object-center'
                      src={item.image.url}
                      layout='fill'
                      alt={item.title}
                      placeholder='blur'
                      blurDataURL='/placeholder.png'
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    )
  }
  return null
}
