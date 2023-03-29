import { useRouter } from 'next/router'
import Head from 'next/head'

import { useGetOrdersQuery } from 'services'

import {
  Pagination,
  ShowWrapper,
  EmptyOrdersList,
  PageContainer,
  OrdersTable,
} from 'components'

import { useChangeRoute } from 'hooks'

export default function OrdersHome() {
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

  return (
    <main id='_adminOrders'>
      <Head>
        <title>مدیریت | سفارشات</title>
      </Head>
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
    </main>
  )
}
OrdersHome.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>
}
