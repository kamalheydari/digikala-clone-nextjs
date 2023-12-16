import { Save } from 'icons'
import { formatNumber } from 'utils'

interface Props {
  inStock: number
}

const Depot: React.FC<Props> = ({ inStock }) => {
  // ? Render(s)
  if (inStock < 10 && inStock !== 0) {
    return <span className="farsi-digits text-red-600">تنها {formatNumber(inStock)} عدد در انبار باقی مانده</span>
  } else if (inStock > 10) {
    return (
      <div className="flex gap-x-1 text-teal-500">
        <Save className="icon text-teal-500" />
        <span className="text-teal-800">موجود در انبار دیجی کالا</span>
      </div>
    )
  } else if (inStock === 0) {
    return null
  }
}

export default Depot
