import { useRouter } from 'next/router'

import { useGetProductReviewsQuery } from 'services'

import {
  Pagination,
  DataStateDisplay,
  EmptyComment,
  ReviewModal,
  ReveiwSkeleton,
  ReviewProductCard,
} from 'components'

interface Porps {
  numReviews: number
  prdouctID: string
  productTitle: string
}

const Reviews: React.FC<Porps> = (props) => {
  //? Props
  const { numReviews, prdouctID, productTitle } = props

  //? Assets
  const { query } = useRouter()
  const page = query.page ? +query.page : 1

  //? Get Product-Reviews Query
  const { data, ...productsReviewQueryProps } = useGetProductReviewsQuery(
    {
      id: prdouctID,
      page,
    },
    { skip: numReviews > 0 ? false : true }
  )

  //? Render(s)
  return (
    <>
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
            <ReviewModal productTitle={productTitle} prdouctID={prdouctID} />

            <p className='mt-6 text-xs text-gray-500'>
              پس از تایید نظر، با مراجعه به صفحه‌ی ماموریت‌های کلابی امتیاز خود
              را دریافت کنید.
            </p>
          </div>

          <DataStateDisplay
            {...productsReviewQueryProps}
            dataLength={data ? data.reviewsLength : 0}
            emptyComponent={<EmptyComment />}
            loadingComponent={<ReveiwSkeleton />}
          >
            <div className='py-3 space-y-4 divide-y-2 lg:px-6 sm:px-2'>
              {data?.reviews?.map((item) => (
                <ReviewProductCard item={item} key={item._id} />
              ))}
            </div>
          </DataStateDisplay>

          {data && data.reviewsLength > 5 && (
            <div className='py-4 mx-auto lg:max-w-5xl'>
              <Pagination
                pagination={data.pagination}
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

export default Reviews
