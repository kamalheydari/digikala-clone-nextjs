import { toFarsiNumber } from "utils/FarsiNumber";

export default function Discount({ product }) {
  if (product.discount > 0 && product.inStock !== 0)
    return (
      <span className='bg-red-500 inline-block py-0.5 px-2 text-white rounded-xl'>
        {toFarsiNumber(product.discount)}%
      </span>
    );
}
