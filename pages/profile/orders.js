import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useChangeRoute } from 'hooks'

import {
  OrderCard,
  Pagination,
  ShowWrapper,
  EmptyOrdersList,
  PageContainer,
  OrderSkeleton,
  ProfileLayout,
} from 'components'

import { useGetOrdersQuery } from 'services'

function Orders() {
  //? Assets
  const { query } = useRouter()
  const changeRoute = useChangeRoute({
    shallow: true,
  })

  //? Get Orders Data
  const { data, isSuccess, isFetching, error, isError, refetch } =
    useGetOrdersQuery({
      pageSize: 5,
      page: query?.page || 1,
    })

  //? Render
  return (
    <main id='profileOrders'>
      <Head>
        <title>پروفایل | تاریخچه سفارشات</title>
      </Head>

      <ProfileLayout>
        <PageContainer title='تاریخچه سفارشات'>
          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data ? data.ordersLength : 0}
            emptyComponent={<EmptyOrdersList />}
            loadingComponent={<OrderSkeleton />}
          >
            <div className='px-4 py-3 space-y-3'>
              {data?.orders.map((item) => (
                <OrderCard key={item._id} order={item} />
              ))}
            </div>
          </ShowWrapper>

          {data?.ordersLength > 5 && (
            <div className='py-4 mx-auto lg:max-w-5xl'>
              <Pagination
                pagination={data.pagination}
                changeRoute={changeRoute}
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
