import { formatNumber } from 'utils'

import { DiscountProduct, Toman } from 'components'

export default function ProductPrice(props) {
  //? Props
  const { singleProduct, inStock, discount, price } = props

  //? Render(s)
  return (
    <div className={`${singleProduct && 'flex flex-col-reverse'}`}>
      <div className='flex items-center'>
        <span className='text-sm text-gray-700 farsi-digits'>
          {formatNumber(price - (discount * price) / 100)}
        </span>
        <Toman className='mr-1 w-7 h-7' />
      </div>

      {discount > 0 && (
        <div>
          <span className='ml-2 text-sm text-gray-500 line-through farsi-digits'>
            {formatNumber(price)}
          </span>
          {singleProduct && discount > 0 && inStock !== 0 && (
            <DiscountProduct discount={discount} />
          )}
        </div>
      )}
    </div>
  )
}
