import { Price, Icons } from "components";
import { toFarsiNumber } from "utils/FarsiNumber";
export default function ({ product }) {
  if (product.inStock !== 0)
    return (
      <div
        className={`px-5 fixed bottom-0 left-0 right-0 shadow-3xl border-t border-gray-300 bg-white flex justify-between items-baseline lg:sticky lg:flex-col-reverse lg:top-32 lg:bg-gray-100 lg:gap-y-4 lg:border-t-0 lg:shadow-none  ${
          product.discount > 0 ? "pt-5 pb-3 lg:p-0" : "pt-2 pb-3 lg:p-0"
        }`}
      >
        <button className='px-12 text-sm btn lg:w-full'>افزودن به سبد</button>

        <div className='lg:self-end'>
          <Price product={product} singleProduct />
        </div>
      </div>
    );
}
