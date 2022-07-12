import Image from "next/image";
import Link from "next/link";

import { Icons, SpecialSell, DiscountProduct, ProductPrice } from "components";

import { truncate } from "utils/truncate";
import { toFarsiNumber } from "utils/FarsiNumber";

export default function ProductCard({ product }) {
  //? Local Components
  const Colors = () => {
    if (product.colors && product.inStock !== 0)
      return product.colors
        .slice(0, 3)
        .map((color) => (
          <span
            key={color.id}
            className='inline-block w-2.5 h-2.5 rounded-xl border-gray-300 shadow border '
            style={{ background: color.hashCode }}
          ></span>
        ));
  };

  const PlusIcon = () => {
    if (product.colors.length > 3 && product.inStock !== 0)
      return <Icons.Plus className='w-3 h-3 mr-1 sm:mr-0' />;
  };

  const Depot = () => {
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
  };

  return (
    <Link href={`products/${product._id}`}>
      <a>
        <article className='pt-2 pb-3 border-b border-gray-100 sm:hover:shadow-3xl sm:px-3 sm:border'>
          <SpecialSell product={product} />
          <div className='flex items-center gap-2 sm:flex-col'>
            <div className='sm:flex sm:p-1 '>
              <div className='relative h-28 w-28 sm:w-56 sm:h-60 sm:mb-8 xl:w-44 xl:h-48'>
                <Image src={product.images[0].url} layout='fill' />
              </div>
              <div className='p-2 flex gap-1.5 items-center sm:flex-col sm:items-end'>
                <Colors />
                <PlusIcon />
              </div>
            </div>
            <div className='flex-1 space-y-3'>
              <h2 className='hidden text-xs leading-6 text-gray-800 break-all h-14 xl:block'>
                {truncate(product.title, 70)}
              </h2>
              <h2 className='text-xs leading-6 text-gray-800 h-14 xl:hidden'>
                {product.title}
              </h2>
              <div className='flex justify-between'>
                <div>
                  <Depot product={product} />
                </div>
                <div className='flex items-center gap-x-1'>
                  <span>4.5</span>
                  <Icons.Star className='icon text-amber-400' />
                </div>
              </div>
              <div className='flex justify-between'>
                <div>
                  <DiscountProduct product={product} />
                </div>
                <ProductPrice product={product} />
              </div>
            </div>
          </div>
        </article>
      </a>
    </Link>
  );
}
