import { setTempColor } from '@/store'

import { useAppDispatch, useAppSelector } from '@/hooks'

import { Check } from '@/icons'

import type { IColor } from '@/types'

interface Props {
  colors: IColor[]
}

const ProductColorSelector: React.FC<Props> = (props) => {
  // ? Props
  const { colors } = props

  // ? Assets
  const dispatch = useAppDispatch()

  // ? Store
  const { tempColor } = useAppSelector((state) => state.cart)

  // ? Render(s)
  return (
    <section className="">
      <div className="flex justify-between p-4">
        <span className="text-sm text-gray-700">رنگ: {tempColor?.name}</span>
        <span className="farsi-digits text-sm">{colors.length} رنگ</span>
      </div>
      <div className="my-3 flex flex-wrap gap-3 px-5">
        {colors.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => dispatch(setTempColor(item))}
            className={` flex cursor-pointer items-center rounded-2xl px-1.5 py-1  ${
              tempColor?.id === item.id ? 'border-2 border-sky-500' : ' border-2 border-gray-300'
            }`}
          >
            <span className="ml-3 inline-block h-5 w-5 rounded-xl shadow" style={{ background: item.hashCode }}>
              {tempColor?.id === item.id && (
                <Check
                  className={`h-5 w-5 ${
                    item.hashCode === '#ffffff'
                      ? 'text-gray-600'
                      : item.hashCode === '#000000'
                        ? 'text-gray-200'
                        : 'text-white'
                  } `}
                />
              )}
            </span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>
      <div className="section-divide-y" />
    </section>
  )
}

export default ProductColorSelector
