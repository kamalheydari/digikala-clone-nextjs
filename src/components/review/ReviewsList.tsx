import { useRouter } from 'next/router'

import { EmptyComment } from 'components/emptyList'
import { ReviewModal } from 'components/modals'
import { DataStateDisplay } from 'components/shared'
import { ReveiwSkeleton } from 'components/skeleton'
import { ReviewProductCard } from 'components/review'
import { Pagination } from 'components/navigation'

import { useGetProductReviewsQuery } from 'services'

interface Porps {
  numReviews: number
  prdouctID: string
  productTitle: string
}

const ReviewsList: React.FC<Porps> = (props) => {
  // ? Props
  const { numReviews, prdouctID, productTitle } = props

  // ? Assets
  const { query } = useRouter()
  const page = query.page ? +query.page : 1

  // ? Get Product-Reviews Query
  const { data, ...productsReviewQueryProps } = useGetProductReviewsQuery(
    {
      id: prdouctID,
      page,
    },
    { skip: !(numReviews > 0) }
  )

  // ? Render(s)
  return (
    <>
      <section className="space-y-4 p-3 lg:max-w-3xl xl:max-w-5xl" id="_productReviews">
        <div className="flex items-center justify-between">
          <h4 className="mb-3 lg:border-b-2 lg:border-red-500">دیدگاه‌ها</h4>
          <span className="farsi-digits text-xs text-sky-500">{numReviews} دیدگاه</span>
        </div>
        <div className="lg:mr-36">
          <div className="mb-8">
            <ReviewModal productTitle={productTitle} prdouctID={prdouctID} />

            <p className="mt-6 text-xs text-gray-500">
              پس از تایید نظر، با مراجعه به صفحه‌ی ماموریت‌های کلابی امتیاز خود را دریافت کنید.
            </p>
          </div>

          <DataStateDisplay
            {...productsReviewQueryProps}
            dataLength={data ? data.reviewsLength : 0}
            emptyComponent={<EmptyComment />}
            loadingComponent={<ReveiwSkeleton />}
          >
            <div className="space-y-4 divide-y-2 py-3 sm:px-2 lg:px-6">
              {data?.reviews?.map((item) => (
                <ReviewProductCard item={item} key={item._id} />
              ))}
            </div>
          </DataStateDisplay>

          {data && data.reviewsLength > 5 && (
            <div className="mx-auto py-4 lg:max-w-5xl">
              <Pagination pagination={data.pagination} section="_productReviews" client />
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default ReviewsList
