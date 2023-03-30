import Head from 'next/head'
import { useRouter } from 'next/router'

import { useGetSingleOrderQuery } from 'services'

import { OrderCard, PageContainer, ShowWrapper } from 'components'

export default function SingleOrder() {
  //? Assets
  const router = useRouter()

  //? Get Order Data
  const { data, isError, error, isFetching, refetch, isSuccess } =
    useGetSingleOrderQuery({
      id: router.query.id,
    })

  //? Render(s)
  return (
    <main>
      <Head>
        <title>مدیریت | سفارش</title>
      </Head>

      <PageContainer title='سفارشات'>
        <ShowWrapper
          error={error}
          isError={isError}
          refetch={refetch}
          isFetching={isFetching}
          isSuccess={isSuccess}
          dataLength={data ? 1 : 0}
          emptyComponent={null}
        >
          <section className='max-w-5xl px-3 py-3 mx-auto lg:px-8'>
            <OrderCard singleOrder order={data?.order} />
          </section>
        </ShowWrapper>
      </PageContainer>
    </main>
  )
}

//? Layout
SingleOrder.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>
}
