import { decrease, increase, removeFromCart } from "app/slices/cart.slice";
import { useDispatch } from "react-redux";

import { Icons } from "components";

import { formatNumber } from "utils/formatNumber";

export default function CartButtons({ item }) {
  const dispatch = useDispatch();

  return (
    <div className='flex items-center py-2 text-sm rounded-md shadow-3xl justify-evenly'>
      <button type='button'>
        <Icons.Plus
          onClick={() => dispatch(increase(item.itemID))}
          className='text-red-500 icon'
        />
      </button>

      <span className='text-sm farsi-digits'>
        {formatNumber(item.quantity)}
      </span>

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
  );
}