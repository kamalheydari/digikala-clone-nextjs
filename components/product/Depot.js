import { Icons } from "components";

import { formatNumber } from "utils/formatNumber";

export default function Depot({ product }) {
  if (product.inStock === 0) {
    return null;
  } else if (product.inStock < 10) {
    return (
      <span className='text-red-500 farsi-digits'>
        تنها {formatNumber(product.inStock)} عدد در انبار باقی مانده
      </span>
    );
  } else {
    return (
      <div className='flex text-teal-400 gap-x-1'>
        <Icons.Save className='icon text-teal-400' />
        <span className='text-teal-700'>موجود در انبار دیجی کالا</span>
      </div>
    );
  }
}
