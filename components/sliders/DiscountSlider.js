import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { DiscountProduct, ProductPrice } from "components";

export default function DiscountSlider({ products, colors, categoryImage }) {
  return (
    <section
      className='lg:rounded-xl lg:mx-3 py-2.5 flex lg:px-1'
      style={{
        background: `linear-gradient(${colors && `${colors[0]},${colors[1]}`})`,
      }}
    >
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={3}
        breakpoints={{ 650: { width: 650, slidesPerView: 4 } }}
      >
        <SwiperSlide className='py-10 '>
          <div className='relative w-20 h-20 mx-auto'>
            <Image src='/icons/amazing-typo.svg' layout='fill' />
          </div>
          <div className='relative w-20 h-20 mx-auto'>
            <Image
              src={categoryImage?.url || "/icons/general.png"}
              layout='fill'
            />
          </div>
        </SwiperSlide>
        {products.map((product, index) => (
          <SwiperSlide
            key={product._id}
            className={`w-fit  bg-white mx-0.5 py-6 ${
              index === 0 ? "rounded-r-lg" : index === 9 ? "rounded-l-lg" : ""
            } `}
          >
            <Link href={`/products/${product._id}`}>
              <a>
                <article>
                  <div className='relative w-32 mx-auto h-36 '>
                    <Image src={product.images[0].url} layout='fill' />
                  </div>
                  <div className='flex justify-between px-3'>
                    <div>
                      <DiscountProduct product={product} />
                    </div>
                    <ProductPrice product={product} />
                  </div>
                </article>
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
