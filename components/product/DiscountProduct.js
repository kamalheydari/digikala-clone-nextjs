import { formatNumber } from "utils/formatNumber";

export default function DiscountProduct({ discount }) {
  return (
    <span className='farsi-digits bg-red-500 inline-block py-0.5 px-2 text-white rounded-xl'>
      {formatNumber(discount)}%
    </span>
  );
}
