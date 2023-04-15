import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useGetSingleOrderQuery } from 'services'

import {
  BigLoading,
  DashboardLayout,
  OrderCard,
  PageContainer,
} from 'components'

function SingleOrder() {
  //? Assets
  const router = useRouter()

  //? Get Order Data
  const { data, isLoading } = useGetSingleOrderQuery({
    id: router.query.id,
  })

  //? Render(s)
  return (
    <main>
      <Head>
        <title>مدیریت | سفارش</title>
      </Head>

      <DashboardLayout>
        <PageContainer title='سفارشات'>
          {isLoading ? (
            <div className='px-3 py-20'>
              <BigLoading />
            </div>
          ) : (
            <section className='max-w-5xl px-3 py-3 mx-auto lg:px-8'>
              <OrderCard singleOrder order={data?.order} />
            </section>
          )}
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(SingleOrder), { ssr: false })
