import { useEffect, useState } from "react";
import Head from "next/head";

import db from "lib/db";
import Product from "models/Product";
import Category from "models/Category";

import { useGetImagesQuery } from "app/api/categoryApi";
import { useRouter } from "next/router";

import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  MostFavouraiteProducts,
  Slider,
} from "components";

export default function MainCategory(props) {
  const router = useRouter();

  //? Local State
  const [images, setImages] = useState({});
  const [category, setCategory] = useState(props.currentCategory);

  //? Get Slider Images Query
  const { data, isSuccess } = useGetImagesQuery();

  useEffect(() => {
    if (isSuccess) setImages(data[router.query.category]);
  }, [isSuccess, router.query.category]);

  return (
    <main className='space-y-12 xl:mt-28'>
      <Head>
        <title>{`دیجی‌کالا | ${category?.name}`}</title>
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
          categoryImage={category?.image}
          colors={images.colors}
        />

        {/* Categories */}
        <Categories childCategories={props.childCategories}>
          خرید بر اساس دسته‌بندهای{" "}
          <span
            className='text-xl'
            style={{
              color: `${images.colors ? `${images?.colors[0]}` : "#212121"}`,
            }}
          >
            {category?.name}
          </span>
        </Categories>

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

export async function getServerSideProps({ params: { category } }) {
  const categoryFilter = {
    category: {
      $regex: category,
      $options: "i",
    },
  };

  const filterFilelds =
    "-description -info -specification -sizes -colors -category -numReviews -reviews";

  await db.connect();
  const bestSells = await Product.find({
    ...categoryFilter,
  })
    .select(filterFilelds)
    .sort({ sold: -1 })
    .limit(15)
    .lean();

  const mostFavourite = await Product.find({
    ...categoryFilter,
  })
    .select(filterFilelds)
    .sort({ rating: -1 })
    .limit(10)
    .lean();

  const discountProducts = await Product.find({
    ...categoryFilter,
    discount: { $gte: 1 },
    inStock: { $gte: 1 },
  })
    .select(filterFilelds)
    .limit(10)
    .sort({ discount: -1 })
    .lean();

  const childCategories = await Category.find({
    parent: "/" + category,
  }).lean();

  const currentCategory = await Category.findOne({
    slug: category,
  }).lean();

  await db.disconnect();

  return {
    props: {
      bestSells: bestSells.map(db.convertDocToObj),
      mostFavourite: mostFavourite.map(db.convertDocToObj),
      discountProducts: discountProducts.map(db.convertDocToObj),
      childCategories: childCategories.map(db.convertDocToObj),
      currentCategory: db.convertDocToObj(currentCategory),
    },
  };
}

MainCategory.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
