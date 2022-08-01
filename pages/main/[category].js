import { useGetDataQuery } from "app/slices/fetchApi.slice";
import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  MostFavouraiteProducts,
  Slider,
} from "components";
import db from "lib/db";
import Product from "models/Product";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const getCategory =
  typeof window !== "undefined" && localStorage.getItem("category")
    ? JSON.parse(localStorage.getItem("category"))
    : {};

const getChildCategories =
  typeof window !== "undefined" && localStorage.getItem("childCategories")
    ? JSON.parse(localStorage.getItem("childCategories"))
    : [];

export default function MainCategory(props) {
  const router = useRouter();

  //? Local State
  const [images, setImages] = useState({});
  const [category, setCategory] = useState(getCategory);
  const [childCategories, setChildCategories] = useState(getChildCategories);

  //? Store
  const { categories } = useSelector((state) => state.categories);

  //? Set Categories
  useEffect(() => {
    const currentCategory = categories.find(
      (cat) => cat.slug === router.query.category
    );

    const currentChildCategories = [
      ...new Set(
        categories.filter((cat) => cat.parent === "/" + currentCategory.slug)
      ),
    ];

    if (currentCategory) {
      setCategory(currentCategory);

      setChildCategories(currentChildCategories);

      localStorage.setItem("category", JSON.stringify(currentCategory));
      localStorage.setItem(
        "childCategories",
        JSON.stringify(currentChildCategories)
      );
    }
  }, [router.query.category]);

  //? Get Slider Images Query
  const { data, isSuccess } = useGetDataQuery({ url: "/api/images" });
  useEffect(() => {
    if (isSuccess) setImages(data[router.query.category]);
  }, [isSuccess, category]);

  return (
    <main className='py-4 mx-auto space-y-12 xl:mt-28 lg:max-w-7xl '>
      {/* Slider */}
      {isSuccess && <Slider images={images?.slider} />}

      {/* Discount Products */}
      {isSuccess && (
        <DiscountSlider
          products={props.discountProducts}
          categoryImage={category?.image}
          colors={images.colors}
        />
      )}

      {/* Categories */}
      <Categories childCategories={childCategories}>
        خرید بر اساس دسته‌بندی
      </Categories>

      {/* Banner One */}
      {isSuccess && <BannerOne images={images?.banner_one} />}

      <BestSellsSlider products={props.bestSells} />

      {/* Banner Two */}
      {isSuccess && <BannerTwo images={images?.banner_two} />}

      {/* MostFavouraiteProducts */}
      <MostFavouraiteProducts products={props.mostFavourite} />
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
  await db.connect();
  const bestSells = await Product.find({
    ...categoryFilter,
  })
    .sort({ sold: -1 })
    .limit(15)
    .lean();

  const mostFavourite = await Product.find({
    ...categoryFilter,
  })
    .sort({ rating: -1 })
    .limit(10)
    .lean();

  const discountProducts = await Product.find({
    ...categoryFilter,
    discount: { $gte: 1 },
    inStock: { $gte: 1 },
  })
    .limit(10)
    .sort({ discount: -1 })
    .lean();

  await db.disconnect();

  return {
    props: {
      bestSells: bestSells.map(db.convertDocToObj),
      mostFavourite: mostFavourite.map(db.convertDocToObj),
      discountProducts: discountProducts.map(db.convertDocToObj),
    },
  };
}

MainCategory.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
