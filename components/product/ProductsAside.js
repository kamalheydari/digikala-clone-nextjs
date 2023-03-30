import { FilterOperation } from 'components'

export default function ProductsAside(props) {
  //? Props
  const { main_maxPrice, main_minPrice, changeRoute, resetRoute } = props

  //? Render(s)
  return (
    <aside className='hidden xl:mt-6 xl:w-60 2xl:w-64 xl:border xl:border-gray-200 xl:rounded-md xl:py-4 xl:px-3 xl:block xl:sticky xl:top-32 xl:h-fit '>
      <FilterOperation
        main_maxPrice={main_maxPrice}
        main_minPrice={main_minPrice}
        changeRoute={changeRoute}
        resetRoute={resetRoute}
      />
    </aside>
  )
}
