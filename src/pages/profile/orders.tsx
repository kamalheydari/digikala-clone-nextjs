import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useGetOrdersQuery } from 'services'

import { EmptyOrdersList } from 'components/emptyList'
import { ProfileLayout } from 'components/layouts'
import { OrderCard } from 'components/order'
import { DataStateDisplay } from 'components/shared'
import { OrderSkeleton } from 'components/skeleton'
import { PageContainer } from 'components/ui'
import { Pagination } from 'components/navigation'

import type { NextPage } from 'next'

const Orders: NextPage = () => {
  // ? Assets
  const { query } = useRouter()

  // ? Get Orders Data
  const { data, ...ordersQueryProps } = useGetOrdersQuery({
    pageSize: 5,
    page: query.page ? +query.page : 1,
  })

  // ? Render
  return (
    <main id="profileOrders">
      <Head>
        <title>پروفایل | تاریخچه سفارشات</title>
      </Head>

      <ProfileLayout>
        <PageContainer title="تاریخچه سفارشات">
          <DataStateDisplay
            {...ordersQueryProps}
            dataLength={data ? data.ordersLength : 0}
            emptyComponent={<EmptyOrdersList />}
            loadingComponent={<OrderSkeleton />}
          >
            <div className="space-y-3 px-4 py-3">
              {data?.orders.map((item) => (
                <OrderCard key={item._id} order={item} />
              ))}
            </div>
          </DataStateDisplay>

          {data && data.ordersLength > 5 && (
            <div className="mx-auto py-4 lg:max-w-5xl">
              <Pagination pagination={data.pagination} section="profileOrders" client />
            </div>
          )}
        </PageContainer>
      </ProfileLayout>
    </main>
  )
}
export default dynamic(() => Promise.resolve(Orders), { ssr: false })
