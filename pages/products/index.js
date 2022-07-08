import db from "lib/db";
import Product from "models/Product";

import {
  ProductCard,
  ProductsAside,
  Pagination,
  Icons,
  Sort,
} from "components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toFarsiNumber } from "utils/FarsiNumber";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "app/slices/modalSlice";

export default function ProductsHome(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { sort } = useSelector((state) => state.filter);

  //? local State
  const [page, setPage] = useState(1);

  const hanldeQuery = ({ page, sort }) => {
    const { query, pathname } = router;
    if (page) query.page = page;
    if (sort) query.sort = sort;

    router.push({
      pathname,
      query,
    });
  };

  const sortHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "sort",
      })
    );
  };

  useEffect(() => {
    hanldeQuery({ page, sort });
  }, [page, sort]);

  useEffect(() => {
    setPage(1);
  }, [sort]);
  return (
    <>
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-[1700px]'>
        <div className='hidden xl:block'>
          <ProductsAside />
        </div>
        <div className='w-full p-4 mt-3 '>
          <div className='divide-y-2 lg:hidden'>
            <div className='flex py-2 gap-x-3'>
              <button type='button' className='flex items-center gap-x-1'>
                <Icons.Filter className='w-6 h-6 icon' />
                <span>فیلتر</span>
              </button>
              <button
                type='button'
                className='flex items-center gap-x-1'
                onClick={sortHandler}
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
          <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {props.products.map((item) => (
              <ProductCard product={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
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
    </>
  );
}

export async function getServerSideProps({ query }) {
  const page = +query.page || 1;
  const page_size = +query.page_size || 10;
  const category = query.category || "all";
  const sort = query.sort || "all";

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
  })
    .sort(order)
    .skip((page - 1) * page_size)
    .limit(page_size)
    .lean();

  const productsLength = await Product.countDocuments({
    ...categoryFilter,
  });
  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
      productsLength,
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
