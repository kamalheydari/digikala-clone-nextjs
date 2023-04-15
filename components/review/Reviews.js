import { useRouter } from 'next/router'

import { useGetProductReviewsQuery } from 'services'

import {
  Pagination,
  Icons,
  ShowWrapper,
  EmptyComment,
  ReviewModal,
  ReveiwSkeleton,
  ReviewProductCard,
} from 'components'

import { useDisclosure, useChangeRoute } from 'hooks'

export default function Reviews(props) {
  //? Props
  const { numReviews, prdouctID, productTitle } = props

  //? Assets
  const { query } = useRouter()
  const changeRoute = useChangeRoute()
  //? Modals
  const [isShowReviewModal, reviewModalHandlers] = useDisclosure()

  //? Get Product-Reviews Query
  const { data, isSuccess, isFetching, error, isError, refetch } =
    useGetProductReviewsQuery(
      {
        id: prdouctID,
        page: query?.page || 1,
      },
      { skip: numReviews > 0 ? false : true }
    )

  //? Handlers
  const handleOpenCommentModal = () => reviewModalHandlers.open()

  //? Render(s)
  return (
    <>
      <ReviewModal
        isShow={isShowReviewModal}
        onClose={reviewModalHandlers.close}
        productTitle={productTitle}
        prdouctID={prdouctID}
      />
      <section
        className='px-3 py-3 space-y-4 lg:max-w-3xl xl:max-w-5xl'
        id='_productReviews'
      >
        <div className='flex items-center justify-between'>
          <h4 className='mb-3 lg:border-b-2 lg:border-red-500'>دیدگاه‌ها</h4>
          <span className='text-xs text-sky-500 farsi-digits'>
            {numReviews} دیدگاه
          </span>
        </div>
        <div className='lg:mr-36'>
          <div className='mb-8'>
            <button
              type='button'
              onClick={handleOpenCommentModal}
              className='flex items-center w-full gap-x-5'
            >
              <Icons.Comment className='icon' />
              <span className='text-sm text-black '>
                دیدگاه خود را درباره این کالا بنویسید
              </span>
              <Icons.ArrowLeft className='mr-auto icon' />
            </button>
            <p className='mt-6 text-xs text-gray-500'>
              پس از تایید نظر، با مراجعه به صفحه‌ی ماموریت‌های کلابی امتیاز خود
              را دریافت کنید.
            </p>
          </div>

          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data ? data.reviewsLength : 0}
            emptyComponent={<EmptyComment />}
            loadingComponent={<ReveiwSkeleton />}
          >
            <div className='py-3 space-y-4 divide-y-2 lg:px-6 sm:px-2'>
              {data?.reviews?.map((item) => (
                <ReviewProductCard item={item} key={item._id} />
              ))}
            </div>
          </ShowWrapper>

          {data?.reviewsLength > 5 && (
            <div className='py-4 mx-auto lg:max-w-5xl'>
              <Pagination
                pagination={data.pagination}
                changeRoute={changeRoute}
                section='_productReviews'
                client
              />
            </div>
          )}
        </div>
      </section>
    </>
  )
}
