import Head from "next/head";
import { useEffect} from "react";

import db from "lib/db";
import Product from "models/Product";

import { useDispatch } from "react-redux";
import { addToLastSeen } from "app/slices/user.slice";


import {
  FreeShipping,
  Services,
  SmilarProductsSlider,
  ImageGallery,
  Description,
  Specification,
  Reviews,
  SelectColor,
  SelectSize,
  OutOfStock,
  AddToCartInfo,
} from "components";

export default function SingleProduct({ product, smilarProducts }) {
  const dispatch = useDispatch();

  //? Add To LastSeen
  useEffect(() => {
    dispatch(
      addToLastSeen({
        productID: product._id,
        image: product.images[0],
        title: product.title,
      })
    );
  }, [product._id]);

  return (
    <main className='xl:mt-28 lg:max-w-[1550px] mx-auto py-4 space-y-4'>
      <Head>
        <title>{`خرید ${product.title}`}</title>
        <meta
          name='description'
          content='هر آنچه که نیاز دارید با بهترین قیمت از دیجی‌کالا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!'
        />
      </Head>
      <div className='h-fit lg:h-[650px] lg:grid lg:grid-cols-9 lg:grid-rows-5 lg:px-4 lg:gap-x-2 lg:gap-y-4 lg:mb-28 xl:gap-x-7'>
        {/* image */}
        <section className='mb-5 lg:col-span-3 lg:row-span-6'>
          <ImageGallery
            images={product.images}
            discount={product.discount}
            inStock={product.inStock}
            productName={product.title}
          />
        </section>

        {/* title */}
        <h2 className='p-3 text-base font-semibold leading-8 tracking-wide text-black/80 lg:col-span-6'>
          {product.title}
        </h2>

        <div className='section-divide-y' />

        {product.colors.length > 0 && <SelectColor colors={product.colors} />}

        {product.sizes.length > 0 && <SelectSize sizes={product.sizes} />}

        {product.inStock === 0 && <OutOfStock />}

        {/* info */}
        <section className='px-4 pb-2 lg:col-start-4 lg:col-end-8 lg:row-start-3 lg:row-end-4'>
          <h4 className='my-3 lg:mt-6'>ویژگی‌ها</h4>
          <ul className='mr-6 space-y-2 list-disc'>
            {product.info.map((item, i) => (
              <li key={i} className='tracking-wide text-gray-500'>
                <span className='ml-2 font-light'>{item[0]} :</span>
                <span className='text-gray-900'>{item[1]}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* free shipping */}
        <section className='lg:col-start-4 lg:col-end-8 lg:row-start-5 lg:row-end-6 lg:bg-white'>
          <FreeShipping />
        </section>

        {/* Add To Cart */}
        {product.inStock > 0 && <AddToCartInfo product={product} />}
      </div>

      <Services />

      {/* description */}
      {product.description.length > 0 && (
        <Description description={product.description} />
      )}

      {/* SmilarProductsSlider */}
      <SmilarProductsSlider products={smilarProducts} />

      <div className='section-divide-y' />

      <div className='flex'>
        <div className='flex-1'>
          {/* specification */}
          <Specification specification={product.specification} />

          <div className='section-divide-y' />

          {/* Reviews */}
          <Reviews
            numReviews={product.numReviews}
            prdouctID={product._id}
            productTitle={product.title}
          />
        </div>
        <div className='hidden w-full px-3 lg:block lg:max-w-xs xl:max-w-sm'>
          {product.inStock > 0 && <AddToCartInfo product={product} second />}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({ params: { id } }) {
  await db.connect();
  const product = await Product.findById({ _id: id }).lean();

  const smilarProducts = await Product.find({
    category: {
      $regex: product.category,
      $options: "i",
    },
    inStock: { $gte: 1 },
  })
    .limit(10)
    .lean();
  await db.disconnect();

  return {
    props: {
      product: db.convertDocToObj(product),
      smilarProducts: smilarProducts.map(db.convertDocToObj),
    },
  };
}

SingleProduct.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
