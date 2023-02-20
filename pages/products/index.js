import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import db from "lib/db";
import Product from "models/Product";

import { useDispatch, useSelector } from "react-redux";
import { updateFilter } from "app/slices/filter.slice";

import { formatNumber } from "utils/formatNumber";

import {
  ProductCard,
  Pagination,
  Icons,
  Sort,
  ProductsAside,
} from "components";
import useCategory from "hooks/useCategory";
import useDisclosure from "hooks/useDisclosure";

export default function ProductsHome(props) {
  let { query, pathname, push } = useRouter();
  const dispatch = useDispatch();

  const [isFilters, filtersHandlers] = useDisclosure();
  const [isSort, sortHandlers] = useDisclosure();

  //? State
  const [page, setPage] = useState(1);

  //? Store
  const { sort } = useSelector((state) => state.filter);

  //? Get Category Data
  const { childCategories, isLoading } = useCategory("/" + query.category);

  //? Handlers
  //* Change Price Range On Filter Change
  useEffect(() => {
    dispatch(
      updateFilter({
        name: "min_price",
        value: props.mainMinPrice,
      })
    );
    dispatch(
      updateFilter({
        name: "max_price",
        value: props.mainMaxPrice,
      })
    );
  }, [query.category, query.inStock, query.discount]);

  const chaneRoute = (obj) => {
    let url = pathname + "?";

    query = { ...query, ...obj };

    Object.keys(query).forEach((key) => (url += `${key}=${query[key]}&`));
    push(url);
  };

  const resetRoute = () => {
    push(`${pathname}?category=${query.category}`);
  };

  //* Change Route On Page Change
  useEffect(() => {
    chaneRoute({ page });
  }, [page]);

  //* Reset Page On Filter And Sort Change
  useEffect(() => {
    setPage(1);
  }, [query.sort, query.inStock, query.discount, query.price]);

  return (
    <main
      className='lg:px-3 lg:container lg:max-w-[1700px] xl:mt-32'
      id='products'
    >
      <Head>
        <title>دیجی‌کالا | فروشگاه</title>
      </Head>
      {/* Categories */}
      {isLoading ? (
        <div className='animate-pulse px-4 my-7'>
          <div className='h-5 w-24 rounded-md bg-red-200 mb-4' />
          <div className=' flex gap-3 pb-3 overflow-x-auto'>
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                className='border-4 border-red-200 rounded-md p-3 '
                key={index}
              >
                <div className='w-24 h-24 md:h-28 md:w-28 lg:w-36 xl:w-36 xl:h-36 rounded-full bg-red-200 mb-2' />
                <div className='h-5 w-20 rounded-md bg-red-200 mx-auto' />
              </div>
            ))}
          </div>
        </div>
      ) : (
        childCategories.length > 0 && (
          <section className='px-4 my-7'>
            <h4 className='mb-4 text-base text-black lg:pt-4'>دسته‌بندی‌ها</h4>
            <div className='flex gap-3 pb-3 overflow-x-auto'>
              {childCategories.map((item) => (
                <div
                  key={item._id}
                  className='px-3 py-4 text-center border-4 border-gray-100 rounded-md'
                >
                  <Link href={`/products?category=${item.slug}`}>
                    <a>
                      <div className='relative w-24 h-24 md:h-28 md:w-32 lg:w-36 xl:w-40 xl:h-36'>
                        <Image
                          src={item.image.url}
                          layout='fill'
                          alt={item.name}
                          placeholder='blur'
                          blurDataURL='/placeholder.png'
                        />
                      </div>
                      <span>{item.name}</span>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )
      )}
      <div className='px-1 lg:flex lg:gap-x-0 xl:gap-x-3'>
        <div
          className={`fixed transition-all duration-700 left-0 right-0 mx-auto z-40 bg-white w-full h-screen mt-1 xl:sticky xl:top-28 xl:z-0 xl:h-fit xl:w-fit  ${
            isFilters ? "top-0" : "top-full"
          }`}
        >
          <ProductsAside
            dispatch={dispatch}
            main_maxPrice={props.mainMaxPrice}
            main_minPrice={props.mainMinPrice}
            filtersHandlers={filtersHandlers}
            chaneRoute={chaneRoute}
            resetRoute={resetRoute}
          />
        </div>
        <div className='w-full p-4 mt-3 '>
          {/* Filters */}
          <div className='divide-y-2 xl:hidden'>
            <div className='flex py-2 gap-x-3'>
              <button
                type='button'
                className='flex items-center gap-x-1'
                onClick={filtersHandlers.open}
              >
                <Icons.Filter className='w-6 h-6 icon' />
                <span>فیلتر</span>
              </button>
              <button
                type='button'
                className='flex items-center gap-x-1'
                onClick={sortHandlers.open}
              >
                <Icons.Sort className='w-6 h-6 icon' />
                <span>{sort.name}</span>
              </button>
            </div>
            <div className='flex justify-between py-2'>
              <span>همه کالاها</span>
              <span className='farsi-digits'>
                {formatNumber(props.productsLength)} کالا
              </span>
            </div>
          </div>
          <Sort
            isSort={isSort}
            sortHandlers={sortHandlers}
            dispatch={dispatch}
            sort={sort}
            productsLength={formatNumber(props.productsLength)}
            chaneRoute={chaneRoute}
          />

          {/* Products */}
          {props.products.length > 0 ? (
            <section className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {props.products.map((item) => (
                <ProductCard product={item} key={item._id} />
              ))}
            </section>
          ) : (
            <section className='text-center text-red-500 xl:border xl:border-gray-200 xl:rounded-md xl:py-4'>
              کالایی یافت نشد
            </section>
          )}
        </div>
      </div>
      {props.productsLength > 10 && (
        <div className='py-4 mx-auto lg:max-w-5xl'>
          <Pagination
            currentPage={props.currentPage}
            nextPage={props.nextPage}
            previousPage={props.previousPage}
            hasNextPage={props.hasNextPage}
            hasPreviousPage={props.hasPreviousPage}
            lastPage={props.lastPage}
            setPage={setPage}
            section='products'
          />
        </div>
      )}
    </main>
  );
}

export async function getServerSideProps({ query }) {
  const category = query.category;
  const page = +query.page || 1;
  const page_size = +query.page_size || 10;
  const sort = +query.sort || 1;
  const inStock = query.inStock || null;
  const discount = query.discount || null;
  const price = query.price;

  //? Filters
  const categoryFilter = category
    ? {
        category: {
          $regex: category,
          $options: "i",
        },
      }
    : {};
  const inStockFilter = inStock === "true" ? { inStock: { $gte: 1 } } : {};

  const discountFilter =
    discount === "true" ? { discount: { $gte: 1 }, inStock: { $gte: 1 } } : {};

  const priceFilter = price
    ? {
        price: {
          $gte: +price.split("-")[0],
          $lte: +price.split("-")[1],
        },
      }
    : {};

  //? Sort
  const order =
    sort === 3
      ? { price: 1 }
      : sort === 4
      ? { price: -1 }
      : sort === 2
      ? { sold: -1 }
      : sort === 1
      ? { createdAt: -1 }
      : { _id: -1 };

  await db.connect();
  const products = await Product.find({
    ...categoryFilter,
    ...inStockFilter,
    ...discountFilter,
    ...priceFilter,
  })
    .select("-description -info -specification -sizes -reviews")
    .sort(order)
    .skip((page - 1) * page_size)
    .limit(page_size)
    .lean();

  const productsLength = await Product.countDocuments({
    ...categoryFilter,
    ...inStockFilter,
    ...discountFilter,
    ...priceFilter,
  });

  const mainMaxPrice = Math.max(
    ...(await Product.find({
      ...categoryFilter,
      ...inStockFilter,
      ...discountFilter,
    }).distinct("price"))
  );
  const mainMinPrice = Math.min(
    ...(await Product.find({
      ...categoryFilter,
      ...inStockFilter,
      ...discountFilter,
    }).distinct("price"))
  );

  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
      productsLength,
      mainMaxPrice,
      mainMinPrice,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page_size * page < productsLength,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(productsLength / page_size),
    },
  };
}

ProductsHome.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
