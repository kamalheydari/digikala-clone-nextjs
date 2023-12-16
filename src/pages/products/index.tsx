import dynamic from 'next/dynamic'
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
  DataStateDisplay,
  EmptyCustomList,
} from 'components'

import { useGetProductsQuery } from 'services'

import type { NextPage } from 'next'

const ProductsHome: NextPage = () => {
  // ? Assets
  const { query } = useRouter()
  const category = query?.category?.toString() ?? ''

  // ? Querirs
  //*    Get Products Data
  const { data, ...productsQueryProps } = useGetProductsQuery(query)

  // ? Render(s)
  return (
    <>
      <Head>
        <title>دیجی‌کالا | فروشگاه</title>
      </Head>

      <ClientLayout>
        <main className="lg:container lg:max-w-[1700px] lg:px-3 xl:mt-32">
          <SubCategories category={category} />

          <div className="px-1 lg:flex lg:gap-x-0 xl:gap-x-3">
            {!productsQueryProps.isLoading && (
              <ProductsAside mainMaxPrice={data?.mainMaxPrice} mainMinPrice={data?.mainMinPrice} />
            )}
            <div id="_products" className="mt-3 w-full p-4 ">
              {/* Filters & Sort */}
              <div className="divide-y-2 divide-gray-300/90">
                <div className="flex gap-x-3 py-2">
                  <div className="block xl:hidden">
                    {!productsQueryProps.isLoading && (
                      <Filter mainMaxPrice={data?.mainMaxPrice} mainMinPrice={data?.mainMinPrice} />
                    )}
                  </div>

                  <Sort />
                </div>

                <div className="flex justify-between py-2">
                  <span>همه کالاها</span>
                  <span className="farsi-digits">{data?.productsLength} کالا</span>
                </div>
              </div>

              <DataStateDisplay
                {...productsQueryProps}
                dataLength={data?.productsLength ? data.productsLength : 0}
                loadingComponent={<ProductSkeleton />}
                emptyComponent={<EmptyCustomList />}
              >
                {data && data.products.length > 0 && (
                  <section className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {data?.products.map((item) => <ProductCard product={item} key={item._id} />)}
                  </section>
                )}
              </DataStateDisplay>
            </div>
          </div>

          {data && data.productsLength > 10 && (
            <div className="mx-auto py-4 lg:max-w-5xl">
              <Pagination pagination={data?.pagination} section="_products" client />
            </div>
          )}
        </main>
      </ClientLayout>
    </>
  )
}

export default dynamic(() => Promise.resolve(ProductsHome), { ssr: false })
