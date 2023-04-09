import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { FilterCheckbox, Toman } from 'components'
import { useChangeRoute, useDebounce } from 'hooks'

export default function FilterOperation(props) {
  //? Props
  const { mainMaxPrice, mainMinPrice } = props

  //? Assets
  const { query, push, pathname } = useRouter()
  const { discount, inStock, price } = query

  const initialFilter = {
    inStock: inStock ? inStock === 'true' : false,
    discount: discount ? discount === 'true' : false,
    maxPrice: price ? +price.split('-')[1] : mainMaxPrice,
    minPrice: price ? +price.split('-')[0] : mainMinPrice,
  }

  //? State
  const [filters, setFilters] = useState(initialFilter)

  //? Debounced Values
  const debouncedMinPrice = useDebounce(filters.minPrice, 1200)
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 1200)

  //? Handlers
  const changeRoute = useChangeRoute({ shallow: false })

  const handlefilter = (e) => {
    if (e.target.type === 'checkbox') {
      setFilters({ ...filters, [e.target.name]: e.target.checked })
      changeRoute({ [e.target.name]: e.target.checked })
    } else if (e.target.type === 'number') {
      setFilters({ ...filters, [e.target.name]: +e.target.value })
    }
  }

  const handleResetFilters = () => {
    push(
      `${pathname}?category=${query.category}&${
        query.sort ? `sort=${query.sort}` : ''
      }`
    )
  }

  const canReset =
    !!inStock ||
    !!discount ||
    mainMinPrice !== debouncedMinPrice ||
    mainMaxPrice !== debouncedMaxPrice

  //? Re-Renders
  useEffect(() => {
    if (mainMinPrice !== debouncedMinPrice)
      changeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
      })
  }, [debouncedMinPrice])

  useEffect(() => {
    if (mainMaxPrice !== debouncedMaxPrice)
      changeRoute({ price: `${debouncedMinPrice}-${debouncedMaxPrice}` })
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
          value={filters.inStock}
          onChange={handlefilter}
        >
          فقط کالاهای موجود
        </FilterCheckbox>
        <FilterCheckbox
          name='discount'
          value={filters.discount}
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
              value={filters.minPrice}
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
              value={filters.maxPrice}
              onChange={handlefilter}
            />

            <Toman className='w-6 h-6' />
          </div>
        </div>
      </div>
    </>
  )
}
