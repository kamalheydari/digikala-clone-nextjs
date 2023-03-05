import Icons from 'components/common/Icons'

import { useSelector } from 'react-redux'

import { formatNumber } from 'utils/formatNumber'

export default function CartTotalItems() {
  const { totalItems } = useSelector((state) => state.cart)

  return (
    <>
      <span className='absolute outline outline-3  bottom-6 left-6 bg-red-500 rounded-md w-5 h-5 p-0.5 text-center text-xs text-white farsi-digits'>
        {formatNumber(totalItems)}
      </span>

      <Icons.Cart className='icon h-7 w-7' />
    </>
  )
}
