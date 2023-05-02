import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  ProductCard,
  Pagination,
  Sort,
  ProductsAside,
  SubCategories,
  Filter,
  ClientLayout,
  ProductSkeleton,
} from 'components'

import { useChangeRoute, useMediaQuery } from 'hooks'

import { useGetCategoriesQuery, useGetProductsQuery } from 'services'
import dynamic from 'next/dynamic'

function ProductsHome() {
  //? Assets
  const { query } = useRouter()
  const isDesktop = useMediaQuery('(min-width:1280px)')

  //? Handlers
  const changeRoute = useChangeRoute()

  const handleChangeRoute = (newQueries) => {
    changeRoute({
      ...query,
      page: 1,
      ...newQueries,
    })
  }

  //? Querirs
  //*    Get Products Data
  const { data, isFetching } = useGetProductsQuery(query)

  //*    Get childCategories Data
  const { isLoading: isLoading_get_categories, childCategories } =
    useGetCategoriesQuery(undefined, {
      selectFromResult: ({ isLoading, data }) => {
        const currentCategory = data?.categories.find(
          (cat) => cat.slug === query?.category
        )
        const childCategories = data?.categories.filter(
          (cat) => cat.parent === currentCategory?._id
        )
        return { childCategories, isLoading }
      },
    })

  //? Render(s)
  return (
    <>
      <Head>
        <title>دیجی‌کالا | فروشگاه</title>
      </Head>

      <ClientLayout>
        <main className='lg:px-3 lg:container lg:max-w-[1700px] xl:mt-32'>
          <SubCategories
            childCategories={childCategories}
            isLoading={isLoading_get_categories}
          />

          <div className='px-1 lg:flex lg:gap-x-0 xl:gap-x-3'>
            <ProductsAside
              mainMaxPrice={data?.mainMaxPrice}
              mainMinPrice={data?.mainMinPrice}
              handleChangeRoute={handleChangeRoute}
            />
            <div id='_products' className='w-full p-4 mt-3 '>
              {/* Filters & Sort */}
              <div className='divide-y-2 '>
                <div className='flex py-2 gap-x-3'>
                  {!isDesktop && (
                    <Filter
                      mainMaxPrice={data?.mainMaxPrice}
                      mainMinPrice={data?.mainMinPrice}
                      handleChangeRoute={handleChangeRoute}
                    />
                  )}

                  <Sort handleChangeRoute={handleChangeRoute} />
                </div>

                <div className='flex justify-between py-2'>
                  <span>همه کالاها</span>
                  <span className='farsi-digits'>
                    {data?.productsLength} کالا
                  </span>
                </div>
              </div>

              {/* Products */}
              {isFetching ? (
                <ProductSkeleton />
              ) : data?.products.length > 0 ? (
                <section className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
                  {data?.products.map((item) => (
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

          {data?.productsLength > 10 && (
            <div className='py-4 mx-auto lg:max-w-5xl'>
              <Pagination
                pagination={data?.pagination}
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

export default dynamic(() => Promise.resolve(ProductsHome), { ssr: false })
