import Head from 'next/head'

import { Category, Product } from 'models'

import { db } from 'utils'

import {
  ProductCard,
  Pagination,
  Sort,
  ProductsAside,
  SubCategories,
  Filter,
  ClientLayout,
} from 'components'

import { useChangeRoute, useMediaQuery } from 'hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { loadFilters } from 'store'
import { useDispatch } from 'react-redux'

export default function ProductsHome(props) {
  //? Props
  const {
    mainMinPrice,
    mainMaxPrice,
    productsLength,
    products,
    pagination,
    childCategories,
  } = props

  //? Assets
  const { query } = useRouter()
  const isMobile = useMediaQuery('(max-width:1024px)')

  //? Handlers
  const changeRoute = useChangeRoute({ shallow: false })
  const handleChangeRoute = (newQueries) => {
    changeRoute({
      ...query,
      page: 1,
      ...newQueries,
    })
  }

  //? Render(s)
  return (
    <>
      <Head>
        <title>دیجی‌کالا | فروشگاه</title>
      </Head>

      <ClientLayout>
        <main className='lg:px-3 lg:container lg:max-w-[1700px] xl:mt-32'>
          <SubCategories childCategories={childCategories} />

          <div className='px-1 lg:flex lg:gap-x-0 xl:gap-x-3'>
            <ProductsAside
              mainMaxPrice={mainMaxPrice}
              mainMinPrice={mainMinPrice}
              handleChangeRoute={handleChangeRoute}
            />
            <div className='w-full p-4 mt-3 '>
              {/* Filters & Sort */}
              <div className='divide-y-2 '>
                <div className='flex py-2 gap-x-3'>
                  {/* {isMobile && (
                    )} */}
                  <Filter
                    mainMaxPrice={mainMaxPrice}
                    mainMinPrice={mainMinPrice}
                    handleChangeRoute={handleChangeRoute}
                  />

                  <Sort handleChangeRoute={handleChangeRoute} />
                </div>

                <div className='flex justify-between py-2'>
                  <span>همه کالاها</span>
                  <span className='farsi-digits'>{productsLength} کالا</span>
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
                changeRoute={handleChangeRoute}
                section='_products'
                client
              />
            </div>
          )}
        </main>
      </ClientLayout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  const category = query.category
  const page = +query.page || 1
  const page_size = +query.page_size || 10
  const sort = +query.sort || 1
  const inStock = query.inStock
  const discount = query.discount
  const price = query.price
  const max_price = +query.max_price
  const min_price = +query.min_price

  //? Filters
  await db.connect()

  const currentCategory = await Category.findOne({
    slug: category,
  }).lean()

  const childCategories = await Category.find({
    parent: currentCategory._id,
  }).lean()

  const currentCategoryID = JSON.parse(JSON.stringify(currentCategory._id))

  const categoryFilter = {
    category: { $in: currentCategoryID },
  }

  const inStockFilter = inStock === 'true' ? { inStock: { $gte: 1 } } : {}

  const discountFilter =
    discount === 'true' ? { discount: { $gte: 1 }, inStock: { $gte: 1 } } : {}

  // const priceFilter =
  //   min_price && max_price
  //     ? {
  //         price: {
  //           $gte: min_price,
  //           $lte: max_price,
  //         },
  //       }
  //     : min_price
  //     ? {
  //         price: { $gte: min_price },
  //       }
  //     : max_price
  //     ? { price: { $gte: max_price } }
  //     : {}

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
      ...discountFilter,
      inStock: { $gte: 1 },
    }).distinct('price'))
  )
  const mainMinPrice = Math.min(
    ...(await Product.find({
      ...categoryFilter,
      ...discountFilter,
      inStock: { $gte: 1 },
    }).distinct('price'))
  )

  await db.disconnect()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      childCategories: JSON.parse(JSON.stringify(childCategories)),
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
