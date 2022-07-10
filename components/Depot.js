import { Icons } from "components";
import { toFarsiNumber } from "utils/FarsiNumber";

export default function Depot({ product }) {
  if (product.inStock === 0) {
    return null;
  } else if (product.inStock < 10) {
    return (
      <span className='text-red-500'>
        تنها {toFarsiNumber(product.inStock)} عدد در انبار باقی مانده
      </span>
    );
  } else {
    return (
      <div className='flex text-teal-700 gap-x-1'>
        <Icons.Save />
        <span className='text-teal-700'>موجود در انبار دیجی کالا</span>
      </div>
    );
  }
}
