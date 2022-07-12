import Image from "next/image";
import { toFarsiNumber } from "utils/FarsiNumber";
import { DiscountProduct } from "components";

export default function ProductPrice({ product, singleProduct }) {
  if (product.inStock !== 0) {
    return (
      <div className={`${singleProduct && "flex flex-col-reverse"}`}>
        <div
          className={`flex items-center ${product.discount === 0 && "h-12"}`}
        >
          <span className='text-sm text-gray-700'>
            {toFarsiNumber(
              product.price - (product.discount * product.price) / 100
            )}
          </span>
          <div className='relative mr-1 w-7 h-7'>
            <Image src='/icons/toman.svg' layout='fill' />
          </div>
        </div>

        {product.discount > 0 && (
          <div className=''>
            <span className='ml-2 text-sm text-gray-500 line-through'>
              {toFarsiNumber(product.price)}
            </span>
            {singleProduct && <DiscountProduct product={product} />}
          </div>
        )}
      </div>
    );
  } else {
    return <span className='h-12'>ناموجود</span>;
  }
}
