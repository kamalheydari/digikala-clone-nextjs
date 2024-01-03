import { setTempSize } from 'store'

import { formatNumber } from 'utils'

import { useAppDispatch, useAppSelector } from 'hooks'

import type { ISize } from 'types'

interface Props {
  sizes: ISize[]
}

const SelectSize: React.FC<Props> = (props) => {
  // ? Props
  const { sizes } = props

  // ? Assets
  const dispatch = useAppDispatch()

  // ? Store
  const { tempSize } = useAppSelector((state) => state.cart)

  // ? Render(s)
  return (
    <section className="farsi-digits">
      <div className="flex justify-between p-4">
        <span className="text-sm text-gray-700">اندازه: {tempSize?.size}</span>
        <span className="text-sm">{formatNumber(sizes.length)} اندازه</span>
      </div>
      <div className="my-3 flex flex-wrap gap-3 px-5">
        {sizes.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => dispatch(setTempSize(item))}
            className={`flex cursor-pointer items-center rounded-full px-2 py-1.5  ${
              tempSize?.id === item.id ? 'border-2 border-sky-500' : ' border-2 border-gray-300'
            }`}
          >
            <span>{item.size}</span>
          </button>
        ))}
      </div>
      <div className="section-divide-y" />
    </section>
  )
}

export default SelectSize
