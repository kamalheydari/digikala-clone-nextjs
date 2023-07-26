import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useGetReviewsQuery } from 'services'

import {
  Pagination,
  ShowWrapper,
  EmptyCommentsList,
  PageContainer,
  ReviewsTable,
  DashboardLayout,
  TableSkeleton,
} from 'components'

import { useChangeRoute } from 'hooks'

import type { NextPage } from 'next'

const Reviews: NextPage = () => {
  //? Assets
  const { query } = useRouter()
  const page = query.page ? +query.page : 1

  const changeRoute = useChangeRoute({
    shallow: true,
  })

  //? Get Review Data
  const { data, isError, error, isFetching, refetch, isSuccess } =
    useGetReviewsQuery({
      page,
    })

  //? Render
  return (
    <main id='_adminReviews'>
      <Head>
        <title>مدیریت | دیدگاه‌ها</title>
      </Head>

      <DashboardLayout>
        <PageContainer title='دیدگاه‌ها'>
          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data?.reviewsLength ?? 0}
            emptyComponent={<EmptyCommentsList />}
            loadingComponent={<TableSkeleton />}
          >
            {data && <ReviewsTable reviews={data?.reviews} />}
          </ShowWrapper>
          {data && data.reviewsLength > 10 && (
            <div className='py-4 mx-auto lg:max-w-5xl'>
              <Pagination
                pagination={data.pagination}
                changeRoute={changeRoute}
                section='_adminReviews'
              />
            </div>
          )}
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Reviews), { ssr: false })
