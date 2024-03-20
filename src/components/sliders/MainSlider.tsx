/* eslint-disable tailwindcss/no-custom-classname */
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

import { ResponsiveImage } from '@/components/ui'

import type { ISlider } from '@/types'

interface Props {
  data: ISlider[]
}

const MainSlider: React.FC<Props> = (props) => {
  // ? Props
  const { data } = props

  const SliderImage = ({ item }: { item: ISlider }) => (
    <ResponsiveImage
      dimensions="w-full h-64 md:h-72 lg:h-[400px]"
      imageStyles="object-cover object-[72%] lg:object-center "
      src={item.image.url}
      alt={item.title}
      unoptimized={true}
      blurDataURL={item.image.placeholder}
    />
  )

  // ? Render(s)
  if (data?.length === 0) return null

  return (
    <section className="lg:mx-3">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper overflow-hidden lg:rounded-2xl"
      >
        {data
          .filter((item) => item.isPublic)
          .map((item, index) => (
            <SwiperSlide key={index}>
              {item.uri ? (
                <a href={item.uri} target="_blank" className="">
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

export default MainSlider
