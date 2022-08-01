import { formatNumber } from "utils/formatNumber";

export default function DiscountProduct({ product }) {
  if (product.discount > 0 && product.inStock !== 0)
    return (
      <span className='farsi-digits bg-red-500 inline-block py-0.5 px-2 text-white rounded-xl'>
        {formatNumber(product.discount)}%
      </span>
    );

  return null;
}
