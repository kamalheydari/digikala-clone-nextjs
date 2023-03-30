import { setTempSize } from 'store'
import { useDispatch, useSelector } from 'react-redux'

import { formatNumber } from 'utils'

export default function SelectSize(props) {
  //? Props
  const { sizes } = props

  //? Assets
  const dispatch = useDispatch()

  //? Store
  const { tempSize } = useSelector((state) => state.cart)

  //? Render(s)
  return (
    <section className='farsi-digits'>
      <div className='flex justify-between p-4'>
        <span className='text-sm text-gray-700'>اندازه: {tempSize?.size}</span>
        <span className='text-sm'>{formatNumber(sizes.length)} اندازه</span>
      </div>
      <div className='flex flex-wrap gap-3 px-5 my-3'>
        {sizes.map((item) => (
          <button
            type='button'
            key={item.id}
            onClick={() => dispatch(setTempSize(item))}
            className={`rounded-full py-1.5 px-2 flex items-center cursor-pointer  ${
              tempSize?.id === item.id
                ? 'border-2 border-sky-500'
                : ' border-2 border-gray-300'
            }`}
          >
            <span>{item.size}</span>
          </button>
        ))}
      </div>
      <div className='section-divide-y' />
    </section>
  )
}
