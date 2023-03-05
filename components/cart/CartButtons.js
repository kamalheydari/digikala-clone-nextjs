import { decrease, increase, removeFromCart } from 'app/slices/cart.slice'
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
          className='icon text-red-500'
        />
      </button>

      <span>{formatNumber(item.quantity)}</span>

      {item.quantity === 1 ? (
        <button type='button'>
          <Icons.Delete
            onClick={() => dispatch(removeFromCart(item.itemID))}
            className='icon text-red-500'
          />
        </button>
      ) : (
        <button type='button'>
          <Icons.Minus
            onClick={() => dispatch(decrease(item.itemID))}
            className='icon text-red-500'
          />
        </button>
      )}
    </div>
  )
}
