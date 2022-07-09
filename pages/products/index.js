import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import db from "lib/db";
import Product from "models/Product";

import { useDispatch, useSelector } from "react-redux";
import { openModal } from "app/slices/modalSlice";
import { resetFilter, updateFilter } from "app/slices/filterSlice";

import { toFarsiNumber } from "utils/FarsiNumber";

import {
  ProductCard,
  Pagination,
  Icons,
  Sort,
  ProductsAside,
} from "components";

export default function ProductsHome(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  //? Store
  const { sort, inStock, discount, max_price, min_price } = useSelector(
    (state) => state.filter
  );

  //? local State
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState(min_price + "-" + max_price);
  const [showFilters, setShowFilters] = useState(false);

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

  useEffect(() => {
    hanldeQuery({ page, sort, inStock, discount, price });
  }, [page, sort, inStock, discount, price]);

  useEffect(() => {
    setPage(1);
  }, [sort, price, inStock, discount]);

  useEffect(() => {
    dispatch(
      resetFilter({ maxPrice: props.maxPrice, minPrice: props.minPrice })
    );

    dispatch(updateFilter({ name: "max_price", value: props.maxPrice }));
    dispatch(updateFilter({ name: "min_price", value: props.minPrice }));
  }, [router.query.category]);

  useEffect(() => {
    setPrice(min_price + "-" + max_price);
  }, [max_price, min_price]);

  return (
    <>
      <div className='lg:flex lg:gap-x-0 xl:gap-x-3 lg:px-3 lg:container lg:max-w-[1700px] xl:mt-28'>
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
              <span>{toFarsiNumber(props.productsLength)} کالا</span>
            </div>
          </div>
          <Sort
            dispatch={dispatch}
            sort={sort}
            productsLength={toFarsiNumber(props.productsLength)}
          />
          {props.products.length > 1 ? (
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
    </>
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
