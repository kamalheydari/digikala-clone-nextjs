import { Save } from '@/icons'

interface Props {
  inStock: number
}

const ProductStockIndicator: React.FC<Props> = ({ inStock }) => {
  // ? Render(s)
  if (inStock < 10 && inStock !== 0) {
    return <span className="farsi-digits text-red-500">تنها {inStock} عدد در انبار باقی مانده</span>
  } else if (inStock > 10) {
    return (
      <div className="flex gap-x-1 text-teal-400">
        <Save className="icon text-teal-400" />
        <span className="text-teal-700">موجود در انبار دیجی کالا</span>
      </div>
    )
  } else if (inStock === 0) {
    return null
  }
}

export default ProductStockIndicator
