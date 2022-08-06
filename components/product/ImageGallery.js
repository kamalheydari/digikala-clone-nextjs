import Image from "next/image";
import { SpecialSell } from "components";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export default function ImageGallery({ images, discount, inStock }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <>
      <div className='hidden lg:block'>
        <SpecialSell discount={discount} inStock={inStock} />
        <div className='relative w-full h-[95vw] lg:h-[350px] xl:h-[510px] max-w-6xl px-4 mx-auto'>
          <Image src={images[currentImage].url} layout='fill' />
        </div>
        <div className='flex gap-x-3 mt-5'>
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative h-20 w-24  cursor-pointer border-2 border-transparent rounded-md overflow-hidden ${
                index === currentImage && "border-red-400"
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <Image src={image.url} layout='fill' />
            </div>
          ))}
        </div>
      </div>
      <div className='lg:hidden'>
        <Swiper pagination={true} modules={[Pagination]} className='mySwiper'>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className='relative h-[95vw] w-full'>
                <Image src={image.url} layout='fill' />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
