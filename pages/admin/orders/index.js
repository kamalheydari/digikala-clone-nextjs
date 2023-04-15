import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useGetOrdersQuery } from 'services'

import {
  Pagination,
  ShowWrapper,
  EmptyOrdersList,
  PageContainer,
  OrdersTable,
  DashboardLayout,
} from 'components'

import { useChangeRoute } from 'hooks'

function OrdersHome() {
  //? Assets
  const { query } = useRouter()
  const changeRoute = useChangeRoute({
    shallow: true,
  })

  //? Get Orders Query
  const { data, isSuccess, isFetching, error, isError, refetch } =
    useGetOrdersQuery({
      page: query?.page || 1,
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
            <ShowWrapper
              error={error}
              isError={isError}
              refetch={refetch}
              isFetching={isFetching}
              isSuccess={isSuccess}
              dataLength={data ? data.ordersLength : 0}
              emptyComponent={<EmptyOrdersList />}
            >
              <OrdersTable orders={data?.orders} />
            </ShowWrapper>

            {data?.ordersLength > 10 && (
              <div className='py-4 mx-auto lg:max-w-5xl'>
                <Pagination
                  pagination={data.pagination}
                  changeRoute={changeRoute}
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
