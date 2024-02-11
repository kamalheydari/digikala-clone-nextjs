import { decrease, increase, removeFromCart } from '@/store'
import { useDispatch } from 'react-redux'

import { formatNumber } from '@/utils'

import { Delete, Minus, Plus } from '@/icons'

import type { ICart } from '@/types'

interface Props {
  item: ICart
}

const CartItemActions: React.FC<Props> = (props) => {
  // ? Props
  const { item } = props

  // ? Assets
  const dispatch = useDispatch()

  // ? Render(s)
  return (
    <div className="flex items-center justify-evenly rounded-md py-2 text-sm shadow-3xl">
      <button className="active:scale-90" type="button">
        <Plus onClick={() => dispatch(increase(item.itemID))} className="icon text-red-500" />
      </button>

      <span className="farsi-digits min-w-[22px] text-center text-sm">{formatNumber(item.quantity)}</span>

      {item.quantity === 1 ? (
        <button className="active:scale-90" type="button">
          <Delete onClick={() => dispatch(removeFromCart(item.itemID))} className="icon text-red-500" />
        </button>
      ) : (
        <button className="active:scale-90" type="button">
          <Minus onClick={() => dispatch(decrease(item.itemID))} className="icon text-red-500" />
        </button>
      )}
    </div>
  )
}

export default CartItemActions
