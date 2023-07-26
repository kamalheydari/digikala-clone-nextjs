import { Toman, TomanRed } from 'components'

import { formatNumber } from 'utils'

interface Props {
  discount: number
  price: number
}

const DiscountCartItem: React.FC<Props> = (props) => {
  //? Props
  const { discount, price } = props

  //? Assets
  const discountPercent = discount / 100

  //? Render(s)
  return (
    <div>
      <div className='flex items-center gap-x-2'>
        <span className='text-red-500 farsi-digits'>
          {formatNumber(+(price * discountPercent).toFixed())}
        </span>

        <TomanRed className='w-6 h-6' />

        <span className='text-red-500'>تخفیف</span>
      </div>
      <div className='flex items-center gap-x-2'>
        <span className='text-sm text-gray-700 farsi-digits'>
          {formatNumber(price - (discount * price) / 100)}
        </span>
        <Toman className='w-6 h-6' />
      </div>
    </div>
  )
}

export default DiscountCartItem
