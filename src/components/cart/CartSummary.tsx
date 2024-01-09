import { formatNumber } from 'utils'

import { Button } from 'components/ui'
import { Toman, TomanRed } from 'icons'

import { useAppSelector } from 'hooks'

interface Props {
  cart?: boolean
  handleRoute?: () => void
}

const CartSummary: React.FC<Props> = (props) => {
  // ? Porps
  const { handleRoute, cart } = props

  // ? Store
  const { totalItems, totalPrice, totalDiscount } = useAppSelector((state) => state.cart)

  // ? Render(s)
  return (
    <div className="mt-10 space-y-5 px-4 py-2 lg:mt-0 lg:h-fit lg:py-4">
      {/* total cart price */}
      <div className="flex justify-between border-b border-gray-200 pb-2">
        <span className="farsi-digits text-sm">قیمت کالاها ({formatNumber(totalItems)})</span>
        <div className="flex-center">
          <span className="farsi-digits">{formatNumber(totalPrice)}</span>
          <Toman className="mr-1 h-7 w-7" />
        </div>
      </div>

      {/* total cart items */}
      <div className="flex justify-between">
        <span>جمع سبد خرید</span>
        <div className="flex-center">
          <span className="farsi-digits text-sm">{formatNumber(totalPrice - totalDiscount)}</span>
          <Toman className="mr-1 h-7 w-7" />
        </div>
      </div>

      <span className="inline-block w-full border-b border-gray-200 pb-2 lg:max-w-xs">
        هزینه ارسال براساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه می‌شود
      </span>

      {/* total cart profit */}
      <div className="flex justify-between">
        <span className="text-red-500">سود شما از خرید</span>
        <div className="flex-center gap-x-1">
          <span className="farsi-digits text-sm text-red-500">
            (% {((totalDiscount / totalPrice) * 100).toFixed(1)})
          </span>
          <span className="farsi-digits text-red-500">{formatNumber(totalDiscount)}</span>
          <TomanRed className="mr-1 h-7 w-7" />
        </div>
      </div>

      {cart && (
        <Button onClick={handleRoute} className="hidden w-full lg:block">
          ادامه
        </Button>
      )}
    </div>
  )
}

export default CartSummary
