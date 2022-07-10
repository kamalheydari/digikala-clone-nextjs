import { Price, Icons } from "components";
import { toFarsiNumber } from "utils/FarsiNumber";
export default function ({ product }) {
  if (product.inStock !== 0)
    return (
      <div
        className={`px-5 fixed bottom-0 left-0 right-0 shadow-3xl border-t border-gray-300 bg-white flex justify-between items-baseline lg:sticky lg:top-32 lg:col-start-8 lg:col-end-10 lg:row-start-2 lg:row-end-5 lg:bg-gray-100 lg:border-t-0 lg:shadow-none lg:rounded-lg lg:flex-col-reverse lg:justify-center lg:gap-y-5 xl:gap-y-2.5 xl:row-end-4 ${
          product.discount > 0 ? "pt-5 pb-3" : "pt-2 pb-3"
        }`}
      >
        <button className='btn px-12 text-sm lg:w-full'>افزودن به سبد</button>

        <div className='lg:self-end'>
          <Price product={product} singleProduct />
        </div>

        <div className='hidden lg:flex lg:items-center lg:gap-x-1'>
          <Icons.Check className='icon' />
          <span> فروش :</span>
          <span>{toFarsiNumber(product.sold)}</span>
        </div>

        <span className='text-red-500 hidden mr-7 lg:block'>
          تنها {toFarsiNumber(product.inStock)} عدد در انبار باقی مانده
        </span>

        <div className='  gap-x-1 hidden lg:flex'>
          <Icons.Save className='icon text-teal-700' />
          <span className='text-gray-700'>موجود در انبار دیجی کالا</span>
        </div>
      </div>
    );
}
