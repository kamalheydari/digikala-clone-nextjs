import { useEffect, useState } from "react";
import Head from "next/head";

import db from "lib/db";
import Product from "models/Product";

import { useGetImagesQuery } from "app/api/categoryApi";

import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  MostFavouraiteProducts,
  Slider,
} from "components";

export default function Home(props) {
  //? Local State
  const [images, setImages] = useState({});

  //? Get Slider Images Query
  const { data, isSuccess } = useGetImagesQuery();
  useEffect(() => {
    if (isSuccess) setImages(data.root);
  }, [isSuccess]);

  return (
    <main className='space-y-12 xl:mt-28'>
      <Head>
        <title>فروشگاه اینترنتی دیجی‌کالا</title>
        <meta
          name='description'
          content='هر آنچه که نیاز دارید با بهترین قیمت از دیجی‌کالا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!'
        />
      </Head>

      {/* Slider */}
      {isSuccess ? (
        <Slider images={images?.slider} />
      ) : (
        <div className='h-52 md:h-70 lg:h-[370px] bg-gray-50' />
      )}

      <div className='py-4 mx-auto space-y-24 xl:mt-28 lg:max-w-[1450px]'>
        {/* Discount Products */}
        <DiscountSlider
          products={props.discountProducts}
          colors={images.colors}
        />

        {/* Categories */}
        <Categories
          parent='/'
          name='دیجی‌کالا'
          color={`${images.colors ? `${images?.colors[0]}` : "#212121"}`}
          homePage
        />

        {/* Banner One */}
        {isSuccess && <BannerOne images={images?.banner_one} />}

        <BestSellsSlider products={props.bestSells} />

        {/* Banner Two */}
        {isSuccess && <BannerTwo images={images?.banner_two} />}

        {/* MostFavouraiteProducts */}
        <MostFavouraiteProducts products={props.mostFavourite} />
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const filterFilelds =
    "-description -info -specification -sizes -colors -category -numReviews -reviews";

  await db.connect();

  const bestSells = await Product.find()
    .select(filterFilelds)
    .sort({ sold: -1 })
    .limit(15)
    .lean();

  const discountProducts = await Product.find({
    discount: { $gte: 1 },
    inStock: { $gte: 1 },
  })
    .select(filterFilelds)
    .sort({ discount: -1 })
    .limit(15)
    .lean();

  const mostFavourite = await Product.find()
    .select(filterFilelds)
    .sort({ rating: -1 })
    .limit(10)
    .lean();

  await db.disconnect();

  return {
    props: {
      bestSells: bestSells.map(db.convertDocToObj),
      discountProducts: discountProducts.map(db.convertDocToObj),
      mostFavourite: mostFavourite.map(db.convertDocToObj),
    },
  };
}

Home.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
