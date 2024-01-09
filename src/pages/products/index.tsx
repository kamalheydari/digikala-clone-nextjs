import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useGetProductsQuery } from 'services'

import { EmptyCustomList } from 'components/emptyList'
import { ClientLayout } from 'components/layouts'
import { ProductSubCategoriesList, ProductCard, ProductFilterControls, ProductSort } from 'components/product'
import { DataStateDisplay } from 'components/shared'
import { ProductSkeleton } from 'components/skeleton'
import { Pagination } from 'components/others'
import { FilterModal } from 'components/modals'

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
          <ProductSubCategoriesList category={category} />

          <div className="px-1 lg:flex lg:gap-x-0 xl:gap-x-3">
            {!productsQueryProps.isLoading && (
              <aside className="hidden xl:sticky xl:top-32 xl:mt-6 xl:block xl:h-fit xl:w-60 xl:rounded-md xl:border xl:border-gray-200 xl:px-3 xl:py-4 2xl:w-64 ">
                <ProductFilterControls mainMaxPrice={data?.mainMaxPrice} mainMinPrice={data?.mainMinPrice} />
              </aside>
            )}
            <div id="_products" className="mt-3 w-full p-4 ">
              {/* Filters & Sort */}
              <div className="divide-y-2 divide-gray-300/90">
                <div className="flex gap-x-3 py-2">
                  <div className="block xl:hidden">
                    {!productsQueryProps.isLoading && (
                      <FilterModal mainMaxPrice={data?.mainMaxPrice} mainMinPrice={data?.mainMinPrice} />
                    )}
                  </div>

                  <ProductSort />
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
                  <section className="space-y-3 divide-y divide-gray-300 sm:grid sm:grid-cols-2 sm:space-y-0 sm:divide-y-0 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                    {data?.products.map((item) => (
                      <ProductCard product={item} key={item._id} />
                    ))}
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
