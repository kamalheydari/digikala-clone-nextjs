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

import type { NextPage } from 'next'

const SingleOrder: NextPage = () => {
  //? Assets
  const { query } = useRouter()

  //? Get Order Data
  const { data, isLoading } = useGetSingleOrderQuery({
    id: query.id as string,
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
          ) : data ? (
            <section className='max-w-5xl px-3 py-3 mx-auto lg:px-8'>
              <OrderCard singleOrder order={data?.order} />
            </section>
          ) : null}
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(SingleOrder), { ssr: false })
