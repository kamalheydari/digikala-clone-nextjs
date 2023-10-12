import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'


import {
  OrderCard,
  Pagination,
  DataStateDisplay,
  EmptyOrdersList,
  PageContainer,
  OrderSkeleton,
  ProfileLayout,
} from 'components'

import { useGetOrdersQuery } from 'services'

import type { NextPage } from 'next'

const Orders: NextPage = () => {
  //? Assets
  const { query } = useRouter()

  //? Get Orders Data
  const { data, ...ordersQueryProps } = useGetOrdersQuery({
    pageSize: 5,
    page: query.page ? +query.page : 1,
  })

  //? Render
  return (
    <main id='profileOrders'>
      <Head>
        <title>پروفایل | تاریخچه سفارشات</title>
      </Head>

      <ProfileLayout>
        <PageContainer title='تاریخچه سفارشات'>
          <DataStateDisplay
            {...ordersQueryProps}
            dataLength={data ? data.ordersLength : 0}
            emptyComponent={<EmptyOrdersList />}
            loadingComponent={<OrderSkeleton />}
          >
            <div className='px-4 py-3 space-y-3'>
              {data?.orders.map((item) => (
                <OrderCard key={item._id} order={item} />
              ))}
            </div>
          </DataStateDisplay>

          {data && data.ordersLength > 5 && (
            <div className='py-4 mx-auto lg:max-w-5xl'>
              <Pagination
                pagination={data.pagination}
                section='profileOrders'
                client
              />
            </div>
          )}
        </PageContainer>
      </ProfileLayout>
    </main>
  )
}
export default dynamic(() => Promise.resolve(Orders), { ssr: false })
