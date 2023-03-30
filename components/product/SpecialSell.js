import { SpecialSellLogo } from 'components'

export default function SpecialSell(props) {
  //? Props
  const { discount, inStock } = props

  //? Render(s)
  if (discount > 0 && inStock !== 0) {
    return <SpecialSellLogo className='w-16 h-7' />
  } else {
    return <div className='h-7' />
  }
}
