import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useGetOrdersQuery } from 'services'

import {
  Pagination,
  DataStateDisplay,
  EmptyOrdersList,
  PageContainer,
  OrdersTable,
  DashboardLayout,
  TableSkeleton,
} from 'components'

import type { NextPage } from 'next'

const OrdersHome: NextPage = () => {
  //? Assets
  const { query } = useRouter()
  const page = query.page ? +query.page : 1

  //? Get Orders Query
  const { data, ...ordersQueryPorps } = useGetOrdersQuery({
    page,
    pageSize: 5,
  })

  //? Render(s)
  return (
    <main id='_adminOrders'>
      <Head>
        <title>مدیریت | سفارشات</title>
      </Head>

      <DashboardLayout>
        <PageContainer title='سفارشات'>
          <section className='p-3 md:px-3 xl:px-8 2xl:px-10' id='orders'>
            <DataStateDisplay
              {...ordersQueryPorps}
              dataLength={data?.ordersLength ?? 0}
              emptyComponent={<EmptyOrdersList />}
              loadingComponent={<TableSkeleton />}
            >
              {data && <OrdersTable orders={data.orders} />}
            </DataStateDisplay>

            {data && data.ordersLength > 10 && (
              <div className='py-4 mx-auto lg:max-w-5xl'>
                <Pagination
                  pagination={data.pagination}
                  section='_adminOrders'
                />
              </div>
            )}
          </section>
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(OrdersHome), { ssr: false })
