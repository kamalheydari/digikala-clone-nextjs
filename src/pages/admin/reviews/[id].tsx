import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useGetSingleReviewQuery } from '@/services'

import { DashboardLayout } from '@/components/Layouts'
import { ReveiwCard } from '@/components/review'
import { PageContainer, FullScreenLoading } from '@/components/ui'

import type { NextPage } from 'next'

const SingleComment: NextPage = () => {
  const { query } = useRouter()

  // ? Get Single Review Data
  const { data, isLoading } = useGetSingleReviewQuery({
    id: query.id as string,
  })

  // ? Render(s)
  return (
    <main>
      <Head>
        <title>مدیریت | دیدگاه‌</title>
      </Head>

      <DashboardLayout>
        <PageContainer title="دیدگاه">
          {isLoading ? (
            <div className="px-3 py-20">
              <FullScreenLoading />
            </div>
          ) : data ? (
            <section className="mx-auto max-w-5xl p-3 lg:px-8">
              <ReveiwCard singleComment item={data.review} />
            </section>
          ) : null}
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(SingleComment), { ssr: false })
