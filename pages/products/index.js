import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import db from "lib/db";
import Product from "models/Product";

import { useDispatch, useSelector } from "react-redux";
import { openModal } from "app/slices/modal.slice";
import { resetFilter, updateFilter } from "app/slices/filter.slice";

import { formatNumber } from "utils/formatNumber";

import {
  ProductCard,
  Pagination,
  Icons,
  Sort,
  ProductsAside,
} from "components";
import Image from "next/image";
import Link from "next/link";

export default function ProductsHome(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  //? Store
  const { sort, inStock, discount, max_price, min_price } = useSelector(
    (state) => state.filter
  );
  const { categories } = useSelector((state) => state.categories);

  //? local State
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const childCategory = [
    ...new Set(
      categories.filter((cat) => cat.parent === "/" + router.query.category)
    ),
  ];

  //? Handlers
  const hanldeQuery = ({ page, sort, inStock, discount, price }) => {
    const { query, pathname } = router;
    if (page) query.page = page;
    if (sort) query.sort = sort;
    if (inStock) {
      query.inStock = 1;
    } else {
      query.inStock = "";
    }
    if (discount) {
      query.discount = 1;
    } else {
      query.discount = "";
    }
    if (price) query.price = price;

    router.push({
      pathname,
      query,
    });
  };

  const openSortModal = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "sort",
      })
    );
  };

  //? Handle Query
  useEffect(() => {
    hanldeQuery({ page, sort, inStock, discount, price });
  }, [page, sort, inStock, discount, price]);

  //? Reset Page On Query Change
  useEffect(() => {
    setPage(1);
  }, [sort, price, inStock, discount]);

  //? Reset Filer On Category Change
  useEffect(() => {
    dispatch(
      resetFilter({ maxPrice: props.maxPrice, minPrice: props.minPrice })
    );

    dispatch(updateFilter({ name: "max_price", value: props.maxPrice }));
    dispatch(updateFilter({ name: "min_price", value: props.minPrice }));
  }, [router.query.category]);

  //? Set Prices
  useEffect(() => {
    if (min_price !== 0 && max_price !== 0)
      setPrice(min_price + "-" + max_price);
  }, [max_price, min_price]);

  return (
    <div className='lg:px-3 lg:container lg:max-w-[1700px] xl:mt-32'>
      {/* Categories */}
      {childCategory.length > 0 && (
        <div className='px-4 my-7'>
          <h4 className='mb-4 text-base text-black'>دسته‌بندی‌ها</h4>
          <div className='flex flex-wrap gap-3'>
            {childCategory.map((item) => (
              <div
                key={item._id}
                className='px-3 py-4 text-center border-4 border-gray-100 rounded-md'
              >
                <Link href={`/products?category=${item.slug}`}>
                  <a>
                    <div className='relative w-24 h-24 md:h-28 md:w-32 lg:w-36 xl:w-40 xl:h-36'>
                      <Image src={item.image.url} layout='fill' />
                    </div>
                    <span>{item.name}</span>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className='px-1 lg:flex lg:gap-x-0 xl:gap-x-3'>
        <div
          className={`fixed transition-all duration-700 left-0 right-0 mx-auto z-40 bg-white w-full h-screen mt-1 xl:sticky xl:top-28 xl:z-0 xl:h-fit xl:w-fit  ${
            showFilters ? "top-0" : "top-full"
          }`}
        >
          <ProductsAside
            dispatch={dispatch}
            maxPrice={props.maxPrice}
            minPrice={props.minPrice}
            setShowFilters={setShowFilters}
          />
        </div>
        <div className='w-full p-4 mt-3 '>
          {/* Filters */}
          <div className='divide-y-2 xl:hidden'>
            <div className='flex py-2 gap-x-3'>
              <button
                type='button'
                className='flex items-center gap-x-1'
                onClick={() => setShowFilters(true)}
              >
                <Icons.Filter className='w-6 h-6 icon' />
                <span>فیلتر</span>
              </button>
              <button
                type='button'
                className='flex items-center gap-x-1'
                onClick={openSortModal}
              >
                <Icons.Sort className='w-6 h-6 icon' />
                <span>{sort}</span>
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
            dispatch={dispatch}
            sort={sort}
            productsLength={formatNumber(props.productsLength)}
          />

          {/* Products */}
          {props.products.length > 0 ? (
            <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
              {props.products.map((item) => (
                <ProductCard product={item} key={item._id} />
              ))}
            </div>
          ) : (
            <div className='text-center text-red-500 xl:border xl:border-gray-200 xl:rounded-md xl:py-4'>
              کالایی یافت نشد
            </div>
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
          />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const page = +query.page || 1;
  const page_size = +query.page_size || 10;
  const category = query.category || "all";
  const sort = query.sort || "all";
  const inStock = +query.inStock || "";
  const discount = +query.discount || "";
  const price = query.price || "";

  //? Filters
  const categoryFilter =
    category && category !== "all"
      ? {
          category: {
            $regex: category,
            $options: "i",
          },
        }
      : {};
  const inStockFilter = inStock === 1 ? { inStock: { $gte: 1 } } : {};

  const discountFilter = discount === 1 ? { discount: { $gte: 1 } } : {};

  const priceFilter =
    price && price !== ""
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

  //? Sort
  const order =
    sort === "ارزان‌ترین"
      ? { price: 1 }
      : sort === "گران‌ترین"
      ? { price: -1 }
      : sort === "پرفروش‌ترین‌"
      ? { sold: -1 }
      : sort === "جدیدترین"
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

  const allProducts = await Product.find({
    ...categoryFilter,
    ...inStockFilter,
    ...discountFilter,
  });

  const maxPrice = await Math.max(...allProducts.map((item) => item.price));
  const minPrice = await Math.min(...allProducts.map((item) => item.price));
  const productsLength = await allProducts.length;
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
      productsLength,
      maxPrice,
      minPrice,
      products,
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
