import { FilterOperation } from 'components'

interface Props {
  mainMaxPrice: number | undefined
  mainMinPrice: number | undefined
}

const ProductsAside: React.FC<Props> = (props) => {
  // ? Props
  const { mainMaxPrice, mainMinPrice } = props

  // ? Render(s)
  return (
    <aside className="hidden xl:sticky xl:top-32 xl:mt-6 xl:block xl:h-fit xl:w-60 xl:rounded-md xl:border xl:border-gray-300 xl:px-3 xl:py-4 2xl:w-64 ">
      <FilterOperation mainMaxPrice={mainMaxPrice} mainMinPrice={mainMinPrice} />
    </aside>
  )
}

export default ProductsAside
