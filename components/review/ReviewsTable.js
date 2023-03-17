import { EditIconBtn } from 'components'
import Image from 'next/image'
import Link from 'next/link'

export default function ReviewsTable({ reviews }) {
  return (
    <section className='mx-3 overflow-x-auto mt-7 lg:mx-10'>
      <table className='w-full whitespace-nowrap'>
        <thead className='h-9 bg-emerald-50'>
          <tr className='text-emerald-500'>
            <th></th>
            <th className='border-gray-100 border-x-2'>ID</th>
            <th>وضعیت</th>
            <th className='border-gray-100 border-x-2'>نام</th>
            <th>تغییر وضعیت</th>
          </tr>
        </thead>
        <tbody className='text-gray-600'>
          {reviews.length > 0 &&
            reviews.map((review) => (
              <tr
                className='text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50'
                key={review._id}
              >
                <td className='p-2'>
                  <div className='relative mx-auto w-7 h-7'>
                    <Image
                      src={review.product.images[0].url}
                      layout='fill'
                      alt='تصویر محصول'
                      placeholder='blur'
                      blurDataURL='/placeholder.png'
                    />
                  </div>
                </td>
                <td className='p-2'>{review._id}</td>
                <td className='p-2 font-bold'>
                  <span
                    className={`py-1.5 px-2 rounded-lg font-bold inline-block
                      ${
                        review.status === 1
                          ? 'bg-amber-100 text-amber-500 '
                          : review.status === 2
                          ? 'bg-green-100 text-green-500 '
                          : 'bg-red-100 text-red-500 '
                      }
                    `}
                  >
                    {review.status === 1
                      ? 'در انتظار تایید'
                      : review.status === 2
                      ? 'تایید شده'
                      : 'رد شده'}
                  </span>
                </td>
                <td className='p-2'>{review.user.name}</td>

                <td className='p-2'>
                  <Link href={`/admin/reviews/${review._id}`}>
                    <a>
                      <EditIconBtn />
                    </a>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  )
}
