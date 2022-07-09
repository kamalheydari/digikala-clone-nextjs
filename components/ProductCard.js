import Image from "next/image";
import { Icons } from "components";
import { toFarsiNumber } from "utils/FarsiNumber";
import { truncate } from "utils/truncate";

export default function ProductCard({ product }) {
  const specialSell = () => {
    if (product.discount > 0 && product.inStock !== 0)
      return <Image src='/icons/specialSell.svg' layout='fill' />;
  };

  const colors = () => {
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

  const plusIcon = () => {
    if (product.colors.length > 3 && product.inStock !== 0)
      return <Icons.Plus className='w-3 h-3 mr-1 sm:mr-0' />;
  };

  const discount = () => {
    if (product.discount > 0 && product.inStock !== 0)
      return (
        <span className='bg-red-500 inline-block py-0.5 px-2 text-white rounded-xl'>
          {product.discount}%
        </span>
      );
  };

  const inStock = () => {
    if (product.inStock !== 0) {
      return (
        <>
          <span className='text-sm text-gray-700'>
            {toFarsiNumber(
              product.price - (product.discount * product.price) / 100
            )}
          </span>
          <div className='relative w-6 h-6'>
            <Image src='/icons/toman.svg' layout='fill' />
          </div>
          {product.discount > 0 && (
            <span className='absolute text-sm text-gray-500 line-through top-4'>
              {toFarsiNumber(product.price)}
            </span>
          )}
        </>
      );
    } else {
      return <span>ناموجود</span>;
    }
  };

  const depot = () => {
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
    <article className='py-1 border-b border-gray-100 sm:hover:shadow-3xl sm:py-6 sm:px-3 sm:border'>
      <div className='relative w-16 h-7'>{specialSell()}</div>
      <div className='flex items-center gap-2 sm:flex-col'>
        <div className='sm:flex sm:p-1 '>
          <div className='relative h-28 w-28 sm:w-56 sm:h-60 sm:mb-8 xl:w-44 xl:h-48'>
            <Image src={product.images[0].url} layout='fill' />
          </div>
          <div className='p-2 flex gap-1.5 items-center sm:flex-col sm:items-end'>
            {colors()}
            {plusIcon()}
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
            <div>{depot()}</div>
            <div className='flex items-center gap-x-1'>
              <span>4.5</span>
              <Icons.Star className='icon text-amber-400' />
            </div>
          </div>
          <div className='flex justify-between'>
            <div>{discount()}</div>
            <div className='relative flex items-center'>{inStock()}</div>
          </div>
        </div>
      </div>
    </article>
  );
}
