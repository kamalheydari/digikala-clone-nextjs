import Image from "next/image";
import { useState } from "react";

import db from "lib/db";
import Product from "models/Product";

import { toFarsiNumber } from "utils/FarsiNumber";
import { truncate } from "utils/truncate";

import { AddToCart, Icons, Services, SpecialSell } from "components";

export default function SingleProduct({ product }) {
  //? Local State
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [isShowDesc, setIsShowDesc] = useState(false);

  //? Handlers
  const handleChangeColor = (item) => {
    setColor(item);
  };

  const handleChangeSize = (item) => {
    setSize(item);
  };

  //? Local Components
  const Colors = () => {
    return (
      <div className='lg:col-start-4 lg:col-end-8 lg:row-start-2 lg:row-end-4'>
        <div className='flex justify-between p-4'>
          <span className='text-gray-700 text-sm'>رنگ: {color.name}</span>
          <span className='text-sm'>
            {toFarsiNumber(product.colors.length)} رنگ
          </span>
        </div>
        <div className='flex flex-wrap gap-3 px-5 my-3'>
          {product.colors.map((item) => (
            <button
              type='button'
              key={item.id}
              onClick={() => handleChangeColor(item)}
              className={` rounded-2xl py-1 px-1.5 flex items-center cursor-pointer  ${
                color.id === item.id
                  ? "border-2 border-sky-500"
                  : " border-2 border-gray-300"
              }`}
            >
              <span
                className='w-5 h-5 ml-3 rounded-xl shadow inline-block'
                style={{ background: item.hashCode }}
              >
                {color.id === item.id && <Icons.Check className='icon' />}
              </span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        <div className='section-divide-y' />
      </div>
    );
  };

  const Sizes = () => {
    return (
      <div className='lg:col-start-4 lg:col-end-8 lg:row-start-2 lg:row-end-4'>
        <div className='flex justify-between p-4'>
          <span className='text-gray-700 text-sm'>اندازه: {size.name}</span>
          <span className='text-sm'>
            {toFarsiNumber(product.sizes.length)} اندازه
          </span>
        </div>
        <div className='flex flex-wrap gap-3 px-5 my-3'>
          {product.sizes.map((item) => (
            <button
              type='button'
              key={item.id}
              onClick={() => handleChangeSize(item)}
              className={`rounded-2xl py-1.5 px-2 flex items-center cursor-pointer  ${
                size.id === item.id
                  ? "border-2 border-sky-500"
                  : " border-2 border-gray-300"
              }`}
            >
              <span>{item.size}</span>
            </button>
          ))}
        </div>
        <div className='section-divide-y' />
      </div>
    );
  };

  const OutOfStock = () => {
    return (
      <div className='lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-3 lg:py-2 lg:bg-gray-100 mx-3 p-1.5 rounded bg-gray-50/50 my-5 lg:my-0 lg:rounded-lg'>
        <div className='flex justify-between items-center gap-x-2'>
          <div className='h-[3px] bg-gray-300 flex-1' />
          <h4 className='text-base text-gray-500 font-bold'>ناموجود</h4>
          <div className='h-[3px] bg-gray-300 flex-1' />
        </div>
        <p className='px-3 text-sm text-gray-700'>
          این کالا فعلا موجود نیست اما می‌توانید زنگوله را بزنید تا به محض موجود
          شدن، به شما خبر دهیم
        </p>
      </div>
    );
  };

  return (
    <div
      className={`xl:mt-28 lg:max-w-[1550px] mx-auto py-4 space-y-4 ${
        product.inStock !== 0 && "mb-16"
      }`}
    >
      <div className='h-fit lg:h-[650px] lg:grid lg:grid-cols-9 lg:grid-rows-5 lg:px-8 lg:gap-x-2 lg:gap-y-4 lg:mb-28'>
        {/* image */}
        <div className='lg:col-span-3 lg:row-span-6 mb-5'>
          <SpecialSell product={product} />
          <div className='relative w-full h-[95vw] lg:h-[350px] xl:h-[510px] max-w-6xl px-4 mx-auto'>
            <Image src={product.images[0].url} layout='fill' />
          </div>
        </div>

        {/* title */}
        <h2 className='text-black/80 leading-8 p-3 tracking-wide text-base font-semibold lg:col-span-6'>
          {product.title}
        </h2>

        <div className='section-divide-y' />

        {product.colors.length > 0 && <Colors />}

        {product.sizes.length > 0 && <Sizes />}

        {product.inStock === 0 && <OutOfStock />}

        {/* info */}
        <div className='px-4 pb-2 lg:col-start-4 lg:col-end-8 lg:row-start-3 lg:row-end-4'>
          <h4 className='lg:mt-6 my-3'>ویژگی‌ها</h4>
          <ul className='space-y-2 list-disc mr-6'>
            {product.info.map((item, i) => (
              <li key={i} className='text-gray-500 tracking-wide'>
                <span className='ml-2  font-light'>{item[0]} :</span>
                <span className='text-gray-900'>{item[1]}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* free shipping */}
        <div className='bg-gray-100 px-7 py-5 lg:col-start-4 lg:col-end-8 lg:row-start-5 lg:row-end-6  lg:bg-white'>
          <div className='bg-white border border-gray-300 rounded-lg flex  justify-between'>
            <div className='p-3'>
              <h4>ارسال رایگان</h4>
              <p className='text-xs lg:text-sm text-gray-500 mt-2'>
                برای سفارش‌ بالای ۵۰۰ هزار تومان
              </p>
            </div>
            <div className='relative w-32  h-20 px-4'>
              <Image src='/icons/freeShipping.svg' layout='fill' />
            </div>
          </div>
        </div>

        <AddToCart product={product} />
      </div>

      <Services />

      {/* description */}
      {product.description.length > 0 && (
        <>
          <div className='px-3 lg:max-w-3xl xl:max-w-5xl'>
            <h4 className='mb-3'>معرفی</h4>
            <p className='text-xs lg:text-sm lg:leading-8 text-gray-600 leading-6 tracking-wider'>
              {isShowDesc
                ? product.description
                : truncate(product.description, 300)}
            </p>
            <button
              type='button'
              className='flex items-center text-sm py-2 text-sky-400'
              onClick={() => setIsShowDesc(!isShowDesc)}
            >
              {isShowDesc ? "بستن" : "مشاهده بیشتر"}
              <Icons.ArrowLeft className='icon text-sky-400' />
            </button>
          </div>
          <div className='section-divide-y lg:block' />
        </>
      )}

      {/* specification */}
      <div className='px-4 lg:max-w-3xl xl:max-w-5xl'>
        <h4 className='mb-3'>مشخصات</h4>
        <ul className='space-y-4'>
          {product.specification.map((item, i) => (
            <li key={i} className='flex '>
              <span className='ml-4 text-gray-500 py-2 font-light w-36 tracking-wide leading-5'>
                {item[0]}
              </span>
              <span className='font-normal text-gray-600 py-2 w-full border-b border-gray-100 leading-5 tracking-wider'>
                {item[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const product = await Product.findById({ _id: query.id }).lean();
  await db.disconnect();

  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}

SingleProduct.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
