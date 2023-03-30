import { Icons } from 'components'

import { formatNumber } from 'utils'

export default function Depot({ inStock }) {
  //? Render(s)
  if (inStock < 10 && inStock !== 0) {
    return (
      <span className='text-red-500 farsi-digits'>
        تنها {formatNumber(inStock)} عدد در انبار باقی مانده
      </span>
    )
  } else if (inStock > 10) {
    return (
      <div className='flex text-teal-400 gap-x-1'>
        <Icons.Save className='text-teal-400 icon' />
        <span className='text-teal-700'>موجود در انبار دیجی کالا</span>
      </div>
    )
  } else if (inStock === 0) {
    return null
  }
}
