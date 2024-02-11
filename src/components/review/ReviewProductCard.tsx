import { Minus, Plus } from '@/icons'
import moment from 'moment-jalaali'

import type { IReview } from '@/types'

interface Props {
  item: IReview
}

const ReviewProductCard: React.FC<Props> = (props) => {
  // ? Props
  const { item } = props

  // ? Render(s)
  return (
    <article className="flex py-3">
      <span
        className={`farsi-digits inline-block h-5 w-5 rounded-md pt-0.5 text-center text-white  ${
          item.rating <= 2 ? 'bg-red-500' : item.rating === 3 ? 'bg-amber-500' : 'bg-green-500'
        }`}
      >
        {item.rating}
      </span>
      <div className="flex-1 space-y-3 px-2.5 lg:px-6">
        <div className="w-full border-b border-gray-100">
          <p className="mb-1">{item.title}</p>
          <span className="farsi-digits text-xs">{moment(item.updatedAt).format('jYYYY/jM/jD')}</span>
          <span className="mx-3 inline-block h-1 w-1 rounded-full bg-gray-400" />
          <span className="text-xs">{item.user?.name}</span>
        </div>

        <p>{item.comment}</p>

        {item.positivePoints.length > 0 && (
          <div>
            {item.positivePoints.map((point) => (
              <div className="flex items-center gap-x-1" key={point.id}>
                <Plus className="icon text-green-400" />
                <p>{point.title}</p>
              </div>
            ))}
          </div>
        )}

        {item.positivePoints.length > 0 && (
          <div>
            {item.negativePoints.map((point) => (
              <div className="flex items-center gap-x-1" key={point.id}>
                <Minus className="icon text-red-400" />
                <p>{point.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default ReviewProductCard
