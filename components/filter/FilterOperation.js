import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { FilterCheckbox, Toman } from 'components'
import { useDebounce } from 'hooks'

export default function FilterOperation(props) {
  //? Props
  const { mainMaxPrice, mainMinPrice, handleChangeRoute } = props

  //? Assets
  const { query } = useRouter()
  let discount = !!query.discount || false
  let inStock = !!query.inStock || false
  let [min_price, max_price] = query.price
    ? query.price.split('-').map(Number)
    : [mainMinPrice, mainMaxPrice]

  //? State
  const [price, setPrice] = useState({
    minPrice: min_price,
    maxPrice: max_price,
  })

  //? Debounced Values
  const debouncedMinPrice = useDebounce(price?.minPrice, 1200)
  const debouncedMaxPrice = useDebounce(price?.maxPrice, 1200)

  //? Handlers
  const handlefilter = (e) => {
    if (e.target.type === 'checkbox') {
      handleChangeRoute({ [e.target.name]: e.target.checked })
    } else if (e.target.type === 'number') {
      setPrice((prevPrice) => ({
        ...prevPrice,
        [e.target.name]: e.target.value,
      }))
    }
  }

  const handleResetFilters = () => {
    handleChangeRoute({ inStock: '', discount: '', price: '' })
    setPrice({
      minPrice: mainMinPrice,
      maxPrice: mainMaxPrice,
    })
  }

  const canReset =
    !!inStock ||
    !!discount ||
    mainMinPrice !== debouncedMinPrice ||
    mainMaxPrice !== debouncedMaxPrice

  //? Re-Renders
  useEffect(() => {
    if (query.price) return
    setPrice({ maxPrice: mainMaxPrice, minPrice: mainMinPrice })
  }, [mainMaxPrice, mainMinPrice, query.category])

  useEffect(() => {
    if (mainMinPrice !== debouncedMinPrice)
      handleChangeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
      })
  }, [debouncedMinPrice])

  useEffect(() => {
    if (mainMaxPrice !== debouncedMaxPrice)
      handleChangeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
      })
  }, [debouncedMaxPrice])

  //? Render(s)
  return (
    <>
      <div className='flex justify-end '>
        <button
          type='button'
          className='text-sm text-sky-500'
          onClick={handleResetFilters}
          disabled={!canReset}
        >
          حذف فیلتر‌ها
        </button>
      </div>

      <div className='divide-y'>
        <FilterCheckbox
          name='inStock'
          checked={inStock}
          onChange={handlefilter}
        >
          فقط کالاهای موجود
        </FilterCheckbox>
        <FilterCheckbox
          name='discount'
          checked={discount}
          onChange={handlefilter}
        >
          فقط کالاهای فروش ویژه
        </FilterCheckbox>

        <div className='py-4'>
          <span className='font-medium text-gray-700'>محدوده قیمت</span>
          <div className='flex items-center justify-between gap-x-1'>
            <span className='text-base'>از</span>
            <input
              type='number'
              className='w-3/4 px-1 text-xl text-left border-b border-gray-200 outline-none farsi-digits'
              style={{ direction: 'ltr' }}
              name='minPrice'
              value={price?.minPrice}
              onChange={handlefilter}
            />
            <Toman className='w-6 h-6' />
          </div>
          <div className='flex items-center justify-between mt-2 mb-4 gap-x-1'>
            <span className='text-base'>تا</span>
            <input
              type='number'
              className='w-3/4 px-1 text-xl text-left border-b border-gray-200 outline-none farsi-digits'
              style={{ direction: 'ltr' }}
              name='maxPrice'
              value={price?.maxPrice}
              onChange={handlefilter}
            />

            <Toman className='w-6 h-6' />
          </div>
        </div>
      </div>
    </>
  )
}
