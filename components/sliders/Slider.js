import { useGetSingleSliderQuery } from 'services'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import { ResponsiveImage, Skeleton } from 'components'

export default function Slider({ id }) {
  //? Get Data
  const { data, isLoading } = useGetSingleSliderQuery({
    id,
  })

  const SliderImage = ({ item }) => (
    <ResponsiveImage
      dimensions='w-full h-64 md:h-72 lg:h-[400px]'
      imageStyles='object-cover object-[72%] lg:object-center '
      src={item.image.url}
      alt={item.title}
      unoptimized={true}
    />
  )

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
                {item.uri.length > 0 ? (
                  <a href={item.uri} target='_blank' className=''>
                    <SliderImage item={item} />
                  </a>
                ) : (
                  <SliderImage item={item} />
                )}
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    )
  }
  return null
}
