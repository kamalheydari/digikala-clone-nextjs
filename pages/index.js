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
import { useEffect } from "react";
import { useState } from "react";
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
      {/* Slider */}
      {isSuccess && <Slider images={images?.slider} />}
      <div className='py-4 mx-auto space-y-12 xl:mt-28 lg:max-w-[1450px]'>
        {/* Discount Products */}
        {isSuccess && (
          <DiscountSlider
            products={props.discountProducts}
            colors={images.colors}
          />
        )}

        {/* Categories */}
        <Categories childCategories={childCategories}>
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

        {/* MostFavouraiteProducts */}
        <MostFavouraiteProducts products={props.mostFavourite} />
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const bestSells = await Product.find().sort({ sold: -1 }).limit(15).lean();

  const mostFavourite = await Product.find()
    .sort({ rating: -1 })
    .limit(10)
    .lean();

  const discountProducts = await Product.find({
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

Home.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
