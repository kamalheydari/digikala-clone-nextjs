import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import db from 'lib/db'
import Product from 'models/Product'
import Category from 'models/Category'

import { useDispatch } from 'react-redux'
import { updateFilter, loadFilters } from 'store'

import { formatNumber } from 'utils/formatNumber'

import {
  ProductCard,
  Pagination,
  Sort,
  ProductsAside,
  SubCategories,
} from 'components'

import useChangeRoute from 'hooks/useChangeRoute'
import Filter from 'components/filter/Filter'

export default function ProductsHome(props) {
  //? Props
  const {
    currentCategoryID,
    mainMinPrice,
    mainMaxPrice,
    productsLength,
    products,
    pagination,
  } = props

  //? Assets
  let { query, pathname, push } = useRouter()
  const dispatch = useDispatch()
  const changeRoute = useChangeRoute({ shallow: false })

  //? Re-Renders
  //* Change Price Range On Filter Change
  useEffect(() => {
    dispatch(
      updateFilter({
        name: 'min_price',
        value: mainMinPrice,
      })
    )
    dispatch(
      updateFilter({
        name: 'max_price',
        value: mainMaxPrice,
      })
    )
  }, [query.category, query.inStock, query.discount])

  //*   load Filters
  useEffect(() => {
    dispatch(loadFilters(query))
  }, [])

  //? Handlers
  const resetRoute = () => push(`${pathname}?category=${query.category}`)

  return (
    <main className='lg:px-3 lg:container lg:max-w-[1700px] xl:mt-32'>
      <Head>
        <title>دیجی‌کالا | فروشگاه</title>
      </Head>

      <SubCategories categoryID={currentCategoryID} />

      <div className='px-1 lg:flex lg:gap-x-0 xl:gap-x-3'>
        <ProductsAside
          main_maxPrice={mainMaxPrice}
          main_minPrice={mainMinPrice}
          changeRoute={changeRoute}
          resetRoute={resetRoute}
        />
        <div className='w-full p-4 mt-3 '>
          {/* Filters & Sort */}
          <div className='divide-y-2 '>
            <div className='flex py-2 gap-x-3'>
              <Filter
                main_maxPrice={mainMaxPrice}
                main_minPrice={mainMinPrice}
                changeRoute={changeRoute}
                resetRoute={resetRoute}
              />

              <Sort changeRoute={changeRoute} />
            </div>

            <div className='flex justify-between py-2'>
              <span>همه کالاها</span>
              <span className='farsi-digits'>
                {formatNumber(productsLength)} کالا
              </span>
            </div>
          </div>

          {/* Products */}
          {products.length > 0 ? (
            <section
              id='_products'
              className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
            >
              {products.map((item) => (
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

      {productsLength > 10 && (
        <div className='py-4 mx-auto lg:max-w-5xl'>
          <Pagination
            pagination={pagination}
            changeRoute={changeRoute}
            section='_products'
            client
        />
        </div>
      )}
    </main>
  )
}

export async function getServerSideProps({ query }) {
  const category = query.category
  const page = +query.page || 1
  const page_size = +query.page_size || 10
  const sort = +query.sort || 1
  const inStock = query.inStock || null
  const discount = query.discount || null
  const price = query.price

  //? Filters
  await db.connect()

  const currentCategory = await Category.findOne({
    slug: category,
  }).lean()

  const currentCategoryID = JSON.parse(JSON.stringify(currentCategory._id))

  const categoryFilter = {
    category: { $in: currentCategoryID },
  }

  const inStockFilter = inStock === 'true' ? { inStock: { $gte: 1 } } : {}

  const discountFilter =
    discount === 'true' ? { discount: { $gte: 1 }, inStock: { $gte: 1 } } : {}

  const priceFilter = price
    ? {
        price: {
          $gte: +price.split('-')[0],
          $lte: +price.split('-')[1],
        },
      }
    : {}

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
      : { _id: -1 }

  const products = await Product.find({
    ...categoryFilter,
    ...inStockFilter,
    ...discountFilter,
    ...priceFilter,
  })
    .select(
      '-description -info -specification -category -category_levels -sizes -reviews'
    )
    .sort(order)
    .skip((page - 1) * page_size)
    .limit(page_size)
    .lean()

  const productsLength = await Product.countDocuments({
    ...categoryFilter,
    ...inStockFilter,
    ...discountFilter,
    ...priceFilter,
  })

  const mainMaxPrice = Math.max(
    ...(await Product.find({
      ...categoryFilter,
      ...inStockFilter,
      ...discountFilter,
    }).distinct('price'))
  )
  const mainMinPrice = Math.min(
    ...(await Product.find({
      ...categoryFilter,
      ...inStockFilter,
      ...discountFilter,
    }).distinct('price'))
  )

  await db.disconnect()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      currentCategoryID,
      productsLength,
      mainMaxPrice,
      mainMinPrice,
      pagination: {
        currentPage: page,
        nextPage: page + 1,
        previousPage: page - 1,
        hasNextPage: page_size * page < productsLength,
        hasPreviousPage: page > 1,
        lastPage: Math.ceil(productsLength / page_size),
      },
    },
  }
}

//? Layout
ProductsHome.getClientLayout = function pageLayout(page) {
  return <>{page}</>
}
