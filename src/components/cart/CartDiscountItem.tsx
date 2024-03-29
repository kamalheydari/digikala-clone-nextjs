import { Toman, TomanRed } from '@/icons'

import { formatNumber } from '@/utils'

interface Props {
  discount: number
  price: number
}

const CartDiscountItem: React.FC<Props> = (props) => {
  // ? Props
  const { discount, price } = props

  // ? Assets
  const discountPercent = discount / 100

  // ? Render(s)
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <span className="farsi-digits text-red-500">{formatNumber(+(price * discountPercent).toFixed())}</span>

        <TomanRed className="h-6 w-6" />

        <span className="text-red-500">تخفیف</span>
      </div>
      <div className="flex items-center gap-x-2">
        <span className="farsi-digits text-sm text-gray-700">{formatNumber(price - (discount * price) / 100)}</span>
        <Toman className="h-6 w-6" />
      </div>
    </div>
  )
}

export default CartDiscountItem
