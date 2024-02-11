import Link from 'next/link'

import { ResponsiveImage, EditIconButton } from '@/components/ui'

import type { IReview } from '@/types'

interface Props {
  reviews: IReview[]
}

const ReviewsTable: React.FC<Props> = (props) => {
  // ? Props
  const { reviews } = props

  // ? Render(s)
  return (
    <section className="mx-3 mt-7 overflow-x-auto lg:mx-10">
      <table className="w-full whitespace-nowrap">
        <thead className="h-9 bg-emerald-50">
          <tr className="text-emerald-500">
            <th></th>
            <th className="border-x-2 border-gray-100">ID</th>
            <th>وضعیت</th>
            <th className="border-x-2 border-gray-100">نام</th>
            <th>تغییر وضعیت</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {reviews.length > 0 &&
            reviews.map((review) => (
              <tr
                className="border-b border-gray-100 text-center text-xs transition-colors hover:bg-gray-50 md:text-sm"
                key={review._id}
              >
                <td className="p-2">
                  <ResponsiveImage
                    dimensions="w-7 h-7"
                    className="mx-auto"
                    src={review.product.images[0].url}
                    blurDataURL={review.product.images[0].placeholder}
                    alt="تصویر محصول"
                  />
                </td>
                <td className="p-2">{review._id}</td>
                <td className="p-2 font-bold">
                  <span
                    className={`inline-block rounded-lg px-2 py-1.5 font-bold
                      ${
                        review.status === 1
                          ? 'bg-amber-100 text-amber-500 '
                          : review.status === 2
                            ? 'bg-green-100 text-green-500 '
                            : 'bg-red-100 text-red-500 '
                      }
                    `}
                  >
                    {review.status === 1 ? 'در انتظار تایید' : review.status === 2 ? 'تایید شده' : 'رد شده'}
                  </span>
                </td>
                <td className="p-2">{review.user.name}</td>

                <td className="p-2">
                  <Link href={`/admin/reviews/${review._id}`}>
                    <EditIconButton />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  )
}

export default ReviewsTable
