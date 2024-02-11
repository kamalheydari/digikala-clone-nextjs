import { ProductSpecialOfferLogo } from '@/icons'

interface Props {
  discount: number
  inStock: number
}

const ProductSpecialOffer: React.FC<Props> = (props) => {
  // ? Props
  const { discount, inStock } = props

  // ? Render(s)
  if (discount > 0 && inStock !== 0) {
    return <ProductSpecialOfferLogo className="h-7 w-16" />
  } else {
    return <div className="h-7" />
  }
}

export default ProductSpecialOffer
