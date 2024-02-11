import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useChangeRoute, useDebounce } from '@/hooks'

import { Toman } from '@/icons'
import { CustomCheckbox } from '@/components/ui'

import { QueryParams } from '@/types'

interface Props {
  mainMaxPrice: number | undefined
  mainMinPrice: number | undefined
  onClose?: () => void
}

const ProductFilterControls: React.FC<Props> = (props) => {
  // ? Props
  const { mainMaxPrice, mainMinPrice, onClose } = props

  // ? Assets
  const { query } = useRouter()
  const inStockQuery = !!query?.inStock || false
  const discountQuery = !!query?.discount || false
  const minPriceQuery = query.price && +query.price.toString().split('-')[0]
  const maxPriceQuery = query.price && +query.price.toString().split('-')[1]
  const pageQuery = Number(query?.page)

  const changeRoute = useChangeRoute()

  // ? State
  const [price, setPrice] = useState({
    minPrice: mainMinPrice,
    maxPrice: mainMaxPrice,
  })

  // ? Debounced Values
  const debouncedMinPrice = useDebounce(price.minPrice!, 1200)
  const debouncedMaxPrice = useDebounce(price.maxPrice!, 1200)

  // ? Handlers
  const handleChangeRoute = (newQueries: QueryParams) => {
    changeRoute({
      ...query,
      page: pageQuery && pageQuery > 1 ? 1 : '',
      ...newQueries,
    })
  }

  const handlefilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target
    if (type === 'checkbox') handleChangeRoute({ [name]: checked })
    if (type === 'number') setPrice((prev) => ({ ...prev, [name]: +value }))
  }

  const handleResetFilters = () => {
    handleChangeRoute({ inStock: '', discount: '', price: '' })
    onClose?.()
  }

  const canReset =
    inStockQuery || discountQuery || mainMinPrice !== debouncedMinPrice || mainMaxPrice !== debouncedMaxPrice

  // ? Re-Renders
  //*   Change Route After Debounce
  useEffect(() => {
    if (debouncedMinPrice && mainMinPrice !== debouncedMinPrice)
      handleChangeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
      })
  }, [debouncedMinPrice])

  useEffect(() => {
    if (debouncedMaxPrice && mainMaxPrice !== debouncedMaxPrice)
      handleChangeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
      })
  }, [debouncedMaxPrice])

  //*   Close Modal on Change Filter
  useEffect(() => {
    onClose?.()
  }, [discountQuery, inStockQuery, debouncedMaxPrice, debouncedMinPrice])

  //*  Change prices when mainMaxPrice and mainMinPrice of category changes
  useEffect(() => {
    if (minPriceQuery && maxPriceQuery)
      setPrice({
        minPrice: minPriceQuery,
        maxPrice: maxPriceQuery,
      })
    else {
      setPrice({
        minPrice: mainMinPrice,
        maxPrice: mainMaxPrice,
      })
    }
  }, [mainMinPrice, mainMaxPrice, minPriceQuery, maxPriceQuery])

  // ? Render(s)
  return (
    <>
      <div className="flex justify-end ">
        <button type="button" className="text-sm text-sky-500" onClick={handleResetFilters} disabled={!canReset}>
          حذف فیلتر‌ها
        </button>
      </div>

      <div className="divide-y">
        <CustomCheckbox name="inStock" checked={inStockQuery} onChange={handlefilter} label="فقط کالاهای موجود" />

        <CustomCheckbox name="discount" checked={discountQuery} onChange={handlefilter} label="فقط کالاهای فروش ویژه" />

        <div className="py-4">
          <span className="font-medium text-gray-700">محدوده قیمت</span>
          <div className="flex items-center justify-between gap-x-1">
            <span className="text-base">از</span>
            <input
              type="number"
              className="farsi-digits w-3/4 border-b border-gray-200 px-1 text-left text-xl outline-none"
              style={{ direction: 'ltr' }}
              name="minPrice"
              value={price.minPrice}
              onChange={handlefilter}
            />
            <Toman className="h-6 w-6" />
          </div>
          <div className="mb-4 mt-2 flex items-center justify-between gap-x-1">
            <span className="text-base">تا</span>
            <input
              type="number"
              className="farsi-digits w-3/4 border-b border-gray-200 px-1 text-left text-xl outline-none"
              style={{ direction: 'ltr' }}
              name="maxPrice"
              value={price.maxPrice}
              onChange={handlefilter}
            />

            <Toman className="h-6 w-6" />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductFilterControls
