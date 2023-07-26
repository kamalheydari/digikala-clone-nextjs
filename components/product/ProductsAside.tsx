import { FilterOperation } from 'components'

import type { NewQueries } from 'hooks/useChangeRoute'

interface Props {
  mainMaxPrice: number | undefined
  mainMinPrice: number | undefined
  handleChangeRoute: (newQueries: NewQueries) => void
}

const ProductsAside: React.FC<Props> = (props) => {
  //? Props
  const { mainMaxPrice, mainMinPrice, handleChangeRoute } = props

  //? Render(s)
  return (
    <aside className='hidden xl:mt-6 xl:w-60 2xl:w-64 xl:border xl:border-gray-200 xl:rounded-md xl:py-4 xl:px-3 xl:block xl:sticky xl:top-32 xl:h-fit '>
      <FilterOperation
        mainMaxPrice={mainMaxPrice}
        mainMinPrice={mainMinPrice}
        handleChangeRoute={handleChangeRoute}
      />
    </aside>
  )
}

export default ProductsAside
