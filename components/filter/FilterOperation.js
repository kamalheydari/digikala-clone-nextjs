import { resetFilter, updateFilter } from 'store'
import { FilterCheckbox, Toman } from 'components'
import { useDispatch, useSelector } from 'react-redux'

export default function FilterOperation(props) {
  //? Props
  const { main_maxPrice, main_minPrice, changeRoute, resetRoute } = props

  const dispatch = useDispatch()

  //? store
  const { inStock, discount, max_price, min_price } = useSelector(
    (state) => state.filter
  )

  //? Handlers
  const handlefilter = (e) => {
    if (e.target.type === 'checkbox') {
      dispatch(updateFilter({ name: e.target.name, value: e.target.checked }))
      changeRoute({ [e.target.name]: e.target.checked })
    } else if (e.target.type === 'number') {
      dispatch(updateFilter({ name: e.target.name, value: +e.target.value }))
    }
  }

  const handleReset = () => {
    dispatch(resetFilter({ maxPrice: main_maxPrice, minPrice: main_minPrice }))
    resetRoute()
  }

  return (
    <>
      <div className='flex justify-end '>
        <button
          type='button'
          className='text-sm text-sky-500'
          onClick={handleReset}
        >
          حذف فیلتر‌ها
        </button>
      </div>

      <div className='divide-y'>
        <FilterCheckbox name='inStock' value={inStock} onChange={handlefilter}>
          فقط کالاهای موجود
        </FilterCheckbox>
        <FilterCheckbox
          name='discount'
          value={discount}
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
              name='min_price'
              min={main_minPrice}
              max={main_maxPrice}
              value={min_price}
              onChange={(e) => {
                handlefilter(e)
                changeRoute({ price: `${e.target.value}-${max_price}` })
              }}
            />
            <Toman className='w-6 h-6' />
          </div>
          <div className='flex items-center justify-between mt-2 mb-4 gap-x-1'>
            <span className='text-base'>تا</span>
            <input
              type='number'
              className='w-3/4 px-1 text-xl text-left border-b border-gray-200 outline-none farsi-digits'
              name='max_price'
              value={max_price}
              max={main_maxPrice}
              min={main_minPrice}
              onChange={(e) => {
                handlefilter(e),
                  changeRoute({ price: `${min_price}-${e.target.value}` })
              }}
            />
            <Toman className='w-6 h-6' />
          </div>
        </div>
      </div>
    </>
  )
}
