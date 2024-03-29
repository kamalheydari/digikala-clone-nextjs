import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useGetReviewsQuery } from '@/services'

import { EmptyCommentsList } from '@/components/emptyList'
import { DashboardLayout } from '@/components/Layouts'
import { ReviewsTable } from '@/components/review'
import { DataStateDisplay } from '@/components/shared'
import { TableSkeleton } from '@/components/skeleton'
import { PageContainer } from '@/components/ui'
import { Pagination } from '@/components/navigation'

import type { NextPage } from 'next'

const Reviews: NextPage = () => {
  // ? Assets
  const { query } = useRouter()
  const page = query.page ? +query.page : 1

  // ? Get Review Data
  const { data, ...getReviewsQueryProps } = useGetReviewsQuery({
    page,
  })

  // ? Render
  return (
    <main id="_adminReviews">
      <Head>
        <title>مدیریت | دیدگاه‌ها</title>
      </Head>

      <DashboardLayout>
        <PageContainer title="دیدگاه‌ها">
          <DataStateDisplay
            {...getReviewsQueryProps}
            dataLength={data?.reviewsLength ?? 0}
            emptyComponent={<EmptyCommentsList />}
            loadingComponent={<TableSkeleton />}
          >
            {data && <ReviewsTable reviews={data?.reviews} />}
          </DataStateDisplay>
          {data && data.reviewsLength > 10 && (
            <div className="mx-auto py-4 lg:max-w-5xl">
              <Pagination pagination={data.pagination} section="_adminReviews" />
            </div>
          )}
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Reviews), { ssr: false })
