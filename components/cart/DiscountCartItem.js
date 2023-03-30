import { Toman, TomanRed } from 'components'

import { formatNumber } from 'utils'

export default function DiscountCartItem(props) {
  //? Props
  const { item } = props

  //? Assets
  const discount = item.discount / 100

  //? Render(s)
  return (
    <div>
      <div className='flex items-center gap-x-2'>
        <span className='text-red-500 farsi-digits'>
          {formatNumber((item.price * discount).toFixed())}
        </span>

        <TomanRed className='w-6 h-6' />

        <span className='text-red-500'>تخفیف</span>
      </div>
      <div className='flex items-center gap-x-2'>
        <span className='text-sm text-gray-700 farsi-digits'>
          {formatNumber(item.price - (item.discount * item.price) / 100)}
        </span>
        <Toman className='w-6 h-6' />
      </div>
    </div>
  )
}
