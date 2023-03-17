import { decrease, increase, removeFromCart } from 'store'
import { useDispatch } from 'react-redux'

import { Icons } from 'components'

import { formatNumber } from 'utils/formatNumber'

export default function CartButtons({ item }) {
  const dispatch = useDispatch()

  return (
    <div className='cart-buttons'>
      <button type='button'>
        <Icons.Plus
          onClick={() => dispatch(increase(item.itemID))}
          className='text-red-500 icon'
        />
      </button>

      <span>{formatNumber(item.quantity)}</span>

      {item.quantity === 1 ? (
        <button type='button'>
          <Icons.Delete
            onClick={() => dispatch(removeFromCart(item.itemID))}
            className='text-red-500 icon'
          />
        </button>
      ) : (
        <button type='button'>
          <Icons.Minus
            onClick={() => dispatch(decrease(item.itemID))}
            className='text-red-500 icon'
          />
        </button>
      )}
    </div>
  )
}
