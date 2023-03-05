import Head from 'next/head'
import { useState } from 'react'

import {
  OrderCard,
  Pagination,
  ShowWrapper,
  EmptyOrdersList,
  PageContainer,
} from 'components'
import { useGetOrdersQuery } from 'app/api/orderApi'

export default function Orders() {
  //? State
  const [page, setPage] = useState(1)

  //? Get Orders Data
  const { data, isSuccess, isFetching, error, isError, refetch } =
    useGetOrdersQuery({
      pageSize: 5,
      page,
    })

  //? Render
  return (
    <main id='profileOrders'>
      <Head>
        <title>پروفایل | تاریخچه سفارشات</title>
      </Head>
      <PageContainer title='تاریخچه سفارشات'>
        <ShowWrapper
          error={error}
          isError={isError}
          refetch={refetch}
          isFetching={isFetching}
          isSuccess={isSuccess}
          dataLength={data ? data.ordersLength : 0}
          emptyElement={<EmptyOrdersList />}
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
              currentPage={data.currentPage}
              nextPage={data.nextPage}
              previousPage={data.previousPage}
              hasNextPage={data.hasNextPage}
              hasPreviousPage={data.hasPreviousPage}
              lastPage={data.lastPage}
              setPage={setPage}
              section='profileOrders'
              client
            />
          </div>
        )}
      </PageContainer>
    </main>
  )
}
Orders.getProfileLayout = function pageLayout(page) {
  return <>{page}</>
}
