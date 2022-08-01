import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default function Slider({ images = [] }) {
  return (
    <section className='overflow-hidden  lg:rounded-xl lg:mx-3'>
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
              <Image className='object-fill ' src={img} layout='fill' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
