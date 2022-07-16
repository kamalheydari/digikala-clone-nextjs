import Image from "next/image";
import { formatNumber } from "utils/formatNumber";
import { DiscountProduct } from "components";

export default function ProductPrice({ product, singleProduct }) {
  if (product.inStock !== 0) {
    return (
      <div className={`${singleProduct && "flex flex-col-reverse"}`}>
        <div
          className={`flex items-center ${product.discount === 0 && "h-12"}`}
        >
          <span className='farsi-digits text-sm text-gray-700'>
            {formatNumber(
              product.price - (product.discount * product.price) / 100
            )}
          </span>
          <div className='relative mr-1 w-7 h-7'>
            <Image src='/icons/toman.svg' layout='fill' />
          </div>
        </div>

        {product.discount > 0 && (
          <div className=''>
            <span className='farsi-digits ml-2 text-sm text-gray-500 line-through'>
              {formatNumber(product.price)}
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
