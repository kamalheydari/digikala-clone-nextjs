import Image from "next/image";
import { useEffect, useState } from "react";

import db from "lib/db";
import Product from "models/Product";

import { openModal } from "app/slices/modal.slice";
import { useDispatch } from "react-redux";
import { useGetDataQuery } from "app/slices/fetchApi.slice";

import moment from "moment-jalaali";

import { formatNumber } from "utils/formatNumber";
import { truncate } from "utils/truncate";

import {
  AddToCart,
  FreeShipping,
  Icons,
  Services,
  SpecialSell,
  Depot,
  SmilarProductsSlider,
} from "components";

export default function SingleProduct({ product, smilarProducts }) {
  const dispatch = useDispatch();

  //? Local State
  const [color, setColor] = useState(product.colors[0] || null);
  const [size, setSize] = useState(product.sizes[0] || null);
  const [isShowDesc, setIsShowDesc] = useState(false);
  const [reviews, setReviews] = useState([]);

  //? Get Query
  const { data, isSuccess } = useGetDataQuery({
    url: `/api/reviews/product/${product._id}`,
  });

  useEffect(() => {
    if (isSuccess) setReviews(data?.reviews);
  }, [isSuccess]);

  //? Handlers
  const handleChangeColor = (item) => {
    setColor(item);
  };

  const handleChangeSize = (item) => {
    setSize(item);
  };

  const handleOpenCommentModal = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "comment",
        title: product.title,
        id: product._id,
      })
    );
  };

  //? Local Components
  const Colors = () => {
    return (
      <div className='lg:col-start-4 lg:col-end-8 lg:row-start-2 lg:row-end-4'>
        <div className='flex justify-between p-4'>
          <span className='text-sm text-gray-700'>رنگ: {color.name}</span>
          <span className='text-sm farsi-digits'>
            {formatNumber(product.colors.length)} رنگ
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
                className='inline-block w-5 h-5 ml-3 shadow rounded-xl'
                style={{ background: item.hashCode }}
              >
                {color.id === item.id && (
                  <Icons.Check
                    className={`h-5 w-5 ${
                      item.hashCode === "#ffffff"
                        ? "text-gray-600"
                        : item.hashCode === "#000000"
                        ? "text-gray-200"
                        : "text-white"
                    } `}
                  />
                )}
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
          <span className='text-sm text-gray-700'>اندازه: {size.name}</span>
          <span className='text-sm'>
            {formatNumber(product.sizes.length)} اندازه
          </span>
        </div>
        <div className='flex flex-wrap gap-3 px-5 my-3'>
          {product.sizes.map((item) => (
            <button
              type='button'
              key={item.id}
              onClick={() => handleChangeSize(item)}
              className={`rounded-full py-1.5 px-2 flex items-center cursor-pointer  ${
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
        <div className='flex items-center justify-between gap-x-2'>
          <div className='h-[3px] bg-gray-300 flex-1' />
          <h4 className='text-base font-bold text-gray-500'>ناموجود</h4>
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
        product.inStock !== 0 && "mb-24"
      }`}
    >
      <div className='h-fit lg:h-[650px] lg:grid lg:grid-cols-9 lg:grid-rows-5 lg:px-4 lg:gap-x-2 lg:gap-y-4 lg:mb-28'>
        {/* image */}
        <div className='mb-5 lg:col-span-3 lg:row-span-6'>
          <SpecialSell product={product} />
          <div className='relative w-full h-[95vw] lg:h-[350px] xl:h-[510px] max-w-6xl px-4 mx-auto'>
            <Image src={product.images[0].url} layout='fill' />
          </div>
        </div>

        {/* title */}
        <h2 className='p-3 text-base font-semibold leading-8 tracking-wide text-black/80 lg:col-span-6'>
          {product.title}
        </h2>

        <div className='section-divide-y' />

        {product.colors.length > 0 && <Colors />}

        {product.sizes.length > 0 && <Sizes />}

        {product.inStock === 0 && <OutOfStock />}

        {/* info */}
        <div className='px-4 pb-2 lg:col-start-4 lg:col-end-8 lg:row-start-3 lg:row-end-4'>
          <h4 className='my-3 lg:mt-6'>ویژگی‌ها</h4>
          <ul className='mr-6 space-y-2 list-disc'>
            {product.info.map((item, i) => (
              <li key={i} className='tracking-wide text-gray-500'>
                <span className='ml-2 font-light'>{item[0]} :</span>
                <span className='text-gray-900'>{item[1]}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* free shipping */}
        <div className='lg:col-start-4 lg:col-end-8 lg:row-start-5 lg:row-end-6 lg:bg-white'>
          <FreeShipping />
        </div>

        {/* Add To Cart */}
        {product.inStock > 0 && (
          <div className='lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-4 lg:rounded-lg lg:bg-gray-100 lg:flex lg:flex-col lg:justify-evenly lg:gap-y-2 xl:row-end-4 lg:px-3 lg:py-1.5 lg:border lg:border-gray-200 lg:shadow lg:sticky lg:top-32'>
            <div className='hidden gap-x-1 lg:flex'>
              <Icons.Save className='text-teal-700 icon' />
              <span className='text-gray-700'>موجود در انبار دیجی کالا</span>
            </div>

            <div className='hidden lg:block'>
              <Depot product={product} />
            </div>

            <div className='hidden lg:flex lg:items-center lg:gap-x-1'>
              <Icons.Check className='icon' />
              <span> فروش :</span>
              <span className='farsi-digits'>{formatNumber(product.sold)}</span>
            </div>

            <AddToCart product={product} color={color} size={size} />
          </div>
        )}
      </div>

      <Services />

      {/* description */}
      {product.description.length > 0 && (
        <>
          <div className='px-3 lg:max-w-3xl xl:max-w-5xl'>
            <h4 className='mb-3 lg:border-b-2 lg:border-red-500 w-min'>
              معرفی
            </h4>
            <p className='text-xs leading-6 tracking-wider text-gray-600 lg:text-sm lg:leading-8'>
              {isShowDesc
                ? product.description
                : truncate(product.description, 300)}
            </p>
            {product.description.length > 300 && (
              <button
                type='button'
                className='flex items-center py-2 text-sm text-sky-400'
                onClick={() => setIsShowDesc(!isShowDesc)}
              >
                {isShowDesc ? "بستن" : "مشاهده بیشتر"}
                <Icons.ArrowLeft className='icon text-sky-400' />
              </button>
            )}
          </div>
          <div className='section-divide-y lg:block' />
        </>
      )}

      {/* SmilarProductsSlider */}
      <SmilarProductsSlider products={smilarProducts} />

      <div className='section-divide-y' />

      {/* specification */}
      <div className='px-4 lg:max-w-4xl xl:max-w-5xl lg:flex lg:gap-x-20'>
        <h4 className='mb-3 h-fit w-min lg:border-b-2 lg:border-red-500'>
          مشخصات
        </h4>
        <ul className='space-y-4 lg:mt-10'>
          {product.specification.map((item, i) => (
            <li key={i} className='flex '>
              <span className='py-2 ml-4 font-light leading-5 tracking-wide text-gray-500 w-36'>
                {item[0]}
              </span>
              <span className='w-full py-2 font-normal leading-5 tracking-wider text-gray-600 border-b border-gray-100'>
                {item[1]}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className='section-divide-y' />
      {/* comments */}
      <div className='px-4 py-3 space-y-4 lg:max-w-4xl xl:max-w-5xl'>
        <div className='flex items-center justify-between'>
          <h4 className='mb-3 lg:border-b-2 lg:border-red-500'>دیدگاه‌ها</h4>
          <span className='text-xs text-sky-500 farsi-digits'>
            {product.numReviews} دیدگاه
          </span>
        </div>
        <div className='lg:mr-36'>
          <div className='mb-8'>
            <button
              type='button'
              onClick={handleOpenCommentModal}
              className='flex items-center w-full gap-x-5'
            >
              <Icons.Comment className='icon' />
              <span className='text-sm text-black '>
                دیدگاه خود را درباره این کالا بنویسید
              </span>
              <Icons.ArrowLeft className='mr-auto icon' />
            </button>
            <p className='mt-6 text-xs text-gray-500'>
              پس از تایید نظر، با مراجعه به صفحه‌ی ماموریت‌های کلابی امتیاز خود
              را دریافت کنید.
            </p>
          </div>

          {reviews.length > 0 ? (
            <div className='px-2 py-3 space-y-4 divide-y-2 lg:px-6'>
              {reviews.map((item) => (
                <div className='flex py-3'>
                  <div>
                    <span
                      className={`farsi-digits w-5 h-5 text-center pt-0.5 inline-block rounded-md text-white  ${
                        item.rating <= 2
                          ? "bg-red-500"
                          : item.rating === 3
                          ? "bg-amber-500"
                          : "bg-green-500"
                      }`}
                    >
                      {item.rating}
                    </span>
                  </div>
                  <div className='flex-1 px-4 space-y-3 lg:px-10'>
                    <div className='w-full border-b border-gray-100'>
                      <p className='mb-1'>{item.title}</p>
                      <span className='text-xs farsi-digits'>
                        {moment(item.updatedAt).format("jYYYY/jM/jD")}
                      </span>
                      <span className='inline-block w-1 h-1 mx-3 bg-gray-400 rounded-full' />
                      <span className='text-xs'>{item.user.name}</span>
                    </div>

                    <p>{item.comment}</p>

                    {item.positivePoints.length > 0 && (
                      <div>
                        {item.positivePoints.map((point) => (
                          <div
                            className='flex items-center gap-x-1'
                            key={point.id}
                          >
                            <Icons.Plus className='text-green-400 icon' />
                            <p>{point.title}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {item.positivePoints.length > 0 && (
                      <div>
                        {item.negativePoints.map((point) => (
                          <div
                            className='flex items-center gap-x-1'
                            key={point.id}
                          >
                            <Icons.Minus className='text-red-400 icon' />
                            <p>{point.title}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='mt-6 text-red-800'>
              هنوز هیچ نظری برای این محصول ثبت نشده, شما اولین نفر باشید.
            </p>
          )}
        </div>
      </div>
    </div>
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
