import Link from "next/link";
import Image from "next/image";

import { formatNumber } from "utils/formatNumber";

import { SpecialSell, CartButtons, Icons, DiscountCartItem } from "components";

export default function CartItem({ item }) {
  return (
    <article className='flex px-4 py-5 gap-x-4 '>
      {/* image & cartButtons */}
      <div className='space-y-4'>
        <div className='relative w-28 h-28'>
          <Image
            src={item.img.url}
            layout='fill'
            alt={item.name}
            placeholder='blur'
            blurDataURL='/placeholder.png'
          />
        </div>
        <div className='mx-auto w-fit '>
          <SpecialSell product={item} />
        </div>
        <CartButtons item={item} />
      </div>

      {/* name */}
      <div>
        <h5 className='mb-3 text-sm'>
          <Link href={`/products/${item.productID}`}>
            <a>{item.name}</a>
          </Link>
        </h5>

        {/* info */}
        <div className='space-y-3'>
          {item.color && (
            <div className='flex items-center gap-x-2'>
              <span
                className='inline-block w-5 h-5 shadow rounded-xl'
                style={{ background: item.color.hashCode }}
              />
              <span>{item.color.name}</span>
            </div>
          )}
          {item.size && (
            <div className='flex items-center gap-x-2'>
              <Icons.Rule className='icon' />
              <span className='farsi-digits'>{item.size.size}</span>
            </div>
          )}
          <div className='flex items-center gap-x-2'>
            <Icons.ShieldCheck className='icon' />
            <span className='font-light'>گارانتی اصالت و ضمانت تحویل</span>
          </div>
          <div className='flex items-center gap-x-2'>
            <Icons.Save className='icon text-sky-400' />
            <span className='font-light'>موجود در انبار دیجی کالا</span>
          </div>
          {item.discount > 0 ? (
            <DiscountCartItem item={item} />
          ) : (
            <div className='flex items-center gap-x-2'>
              <span className='text-sm text-gray-700 farsi-digits'>
                {formatNumber(item.price)}
              </span>
              <div className='relative w-6 h-6'>
                <Image src='/icons/toman.svg' layout='fill' alt='تومان' />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
