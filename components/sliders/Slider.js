import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

import { ResponsiveImage } from 'components'

export default function Slider(props) {
  //? Props
  const { data } = props

  const SliderImage = ({ item }) => (
    <ResponsiveImage
      dimensions='w-full h-64 md:h-72 lg:h-[400px]'
      imageStyles='object-cover object-[72%] lg:object-center '
      src={item.image.url}
      alt={item.title}
      unoptimized={true}
    />
  )

  //? Render(s)
  if (data?.sliders.length === 0) return null

  return (
    <section className='lg:mx-3'>
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          loop: true,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className='mySwiper overflow-hidden lg:rounded-2xl'
      >
        {data?.sliders
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
