import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useGetSingleReviewQuery } from 'services'

import {
  BigLoading,
  DashboardLayout,
  PageContainer,
  ReveiwCard,
} from 'components'

function SingleComment() {
  const router = useRouter()

  //? Get Single Review Data
  const { data, isLoading } = useGetSingleReviewQuery({
    id: router.query.id,
  })

  //? Render(s)
  return (
    <main>
      <Head>
        <title>مدیریت | دیدگاه‌</title>
      </Head>

      <DashboardLayout>
        <PageContainer title='دیدگاه'>
          {isLoading ? (
            <div className='px-3 py-20'>
              <BigLoading />
            </div>
          ) : (
            <section className='max-w-5xl px-3 py-3 mx-auto lg:px-8'>
              <ReveiwCard singleComment item={data?.review} />
            </section>
          )}
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(SingleComment), { ssr: false })
