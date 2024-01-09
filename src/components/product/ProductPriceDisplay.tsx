import { formatNumber } from 'utils'

import { Toman } from 'icons'
import { ProductDiscountTag } from 'components/product'

interface Props {
  singleProduct?: boolean
  inStock: number
  discount: number
  price: number
}

const ProductPriceDisplay: React.FC<Props> = (props) => {
  // ? Props
  const { singleProduct, inStock, discount, price } = props

  // ? Render(s)
  return (
    <div className={`${singleProduct && 'flex flex-col-reverse'}`}>
      <div className="flex items-center">
        <span className="farsi-digits text-sm text-gray-700">{formatNumber(price - (discount * price) / 100)}</span>
        <Toman className="mr-1 h-7 w-7" />
      </div>

      {discount > 0 && (
        <div>
          <span className="farsi-digits ml-2 text-sm text-gray-500 line-through">{formatNumber(price)}</span>
          {singleProduct && discount > 0 && inStock !== 0 && <ProductDiscountTag discount={discount} />}
        </div>
      )}
    </div>
  )
}

export default ProductPriceDisplay
