import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default function Slider({ images = [] }) {
  return (
    <section className='overflow-hidden lg:rounded-xl xl:rounded-none xl:mx-0 lg:mx-3'>
      <Swiper
        pagination={true}
        autoplay={{
          delay: 2500,
          loop: true,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className='mySwiper'
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className='relative w-full h-52 md:h-70 lg:h-[370px]'>
              <Image
                className='object-cover object-[70%] lg:object-center'
                src={img}
                layout='fill'
                alt={img}
                placeholder='blur'
                blurDataURL='/placeholder.png'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
