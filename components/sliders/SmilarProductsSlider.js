import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// import required modules
import { Navigation, FreeMode } from "swiper";
import { ProductCard } from "components";

export default function SmilarProductsSlider({ products }) {
  return (
    <section className='px-3 py-4 overflow-hidden lg:border lg:border-gray-100 lg:rounded-md'>
      <h4 className='mb-3 lg:border-b-2 lg:border-red-500 w-fit'>
        کالاهای مشابه
      </h4>
      <Swiper
        navigation={true}
        modules={[Navigation, FreeMode]}
        slidesPerView={1}
        spaceBetween={0}
        breakpoints={{ 640: { width: 640, slidesPerView: 2 } }}
        freeMode={true}
        className=''
      >
        {products.map((item) => (
          <SwiperSlide
            key={item._id}
            className='px-12 sm:px-0 sm:border-l lg:my-3'
          >
            <ProductCard product={item} slide />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
