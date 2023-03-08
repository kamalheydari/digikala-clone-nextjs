import Icons from 'components/common/Icons'

import { useSelector } from 'react-redux'

import { formatNumber } from 'utils/formatNumber'

export default function CartBadge() {
  const { totalItems } = useSelector((state) => state.cart)

  return (
    <div className='cart-badge'>
      <span>{formatNumber(totalItems)}</span>

      <Icons.Cart className='icon h-7 w-7' />
    </div>
  )
}
