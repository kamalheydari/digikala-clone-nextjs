import { useEffect, useState } from "react";
import Head from "next/head";

import db from "lib/db";
import Product from "models/Product";

import { useGetDataQuery } from "app/slices/fetchApi.slice";

import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  Slider,
} from "components";
import { useSelector } from "react-redux";

export default function Home(props) {
  //? Local State
  const [images, setImages] = useState({});
  const [childCategories, setChildCategories] = useState([]);

  //? Store
  const { categories } = useSelector((state) => state.categories);

  //? Set Categories
  useEffect(() => {
    setChildCategories(categories.filter((cat) => cat.parent === "/"));
  }, [categories]);

  //? Get Slider Images Query
  const { data, isSuccess } = useGetDataQuery({ url: "/api/images" });
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

      <div className='py-4 mx-auto space-y-12 xl:mt-28 lg:max-w-[1450px]'>
        {/* Discount Products */}
        <DiscountSlider
          products={props.discountProducts}
          colors={images.colors}
        />

        {/* Categories */}
        <Categories childCategories={childCategories} homePage>
          خرید بر اساس دسته‌بندهای{" "}
          <span
            className='text-xl'
            style={{
              color: `${images.colors ? `${images?.colors[0]}` : "#212121"}`,
            }}
          >
            دیجی‌کالا
          </span>
        </Categories>

        {/* Banner One */}
        {isSuccess && <BannerOne images={images?.banner_one} />}

        <BestSellsSlider products={props.bestSells} />

        {/* Banner Two */}
        {isSuccess && <BannerTwo images={images?.banner_two} />}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const bestSells = await Product.find().sort({ sold: -1 }).limit(15).lean();

  const discountProducts = await Product.find({
    discount: { $gte: 1 },
    inStock: { $gte: 1 },
  })
    .limit(15)
    .sort({ discount: -1 })
    .lean();

  await db.disconnect();

  return {
    props: {
      bestSells: bestSells.map(db.convertDocToObj),
      discountProducts: discountProducts.map(db.convertDocToObj),
    },
  };
}

Home.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
