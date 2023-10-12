import { decrease, increase, removeFromCart } from 'store'
import { useDispatch } from 'react-redux'

import { formatNumber } from 'utils'

import type { ICart } from 'types'
import { Delete, Minus, Plus } from 'icons'

interface Props {
  item: ICart
}

const CartButtons: React.FC<Props> = (props) => {
  //? Props
  const { item } = props

  //? Assets
  const dispatch = useDispatch()

  //? Render(s)
  return (
    <div className='flex items-center py-2 text-sm rounded-md shadow-3xl justify-evenly'>
      <button className='active:scale-90' type='button'>
        <Plus
          onClick={() => dispatch(increase(item.itemID))}
          className='text-red-500 icon'
        />
      </button>

      <span className='text-sm farsi-digits min-w-[22px] text-center'>
        {formatNumber(item.quantity)}
      </span>

      {item.quantity === 1 ? (
        <button className='active:scale-90' type='button'>
          <Delete
            onClick={() => dispatch(removeFromCart(item.itemID))}
            className='text-red-500 icon'
          />
        </button>
      ) : (
        <button className='active:scale-90' type='button'>
          <Minus
            onClick={() => dispatch(decrease(item.itemID))}
            className='text-red-500 icon'
          />
        </button>
      )}
    </div>
  )
}

export default CartButtons
