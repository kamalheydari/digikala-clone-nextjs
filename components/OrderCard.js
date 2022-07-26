import Image from "next/image";
import Link from "next/link";

import moment from "moment-jalaali";

import { Icons } from "components";

import { formatNumber } from "utils/formatNumber";

export default function OrderCard({ item }) {
  return (
    <div className='py-4 space-y-3 border-b border-gray-200 lg:border lg:rounded-lg '>
      <div className='flex justify-between lg:px-3'>
        <div className='flex items-center gap-x-2 '>
          {item.delivered ? (
            <Icons.Check className='p-0.5 w-6 h-6 bg-lime-500 text-white rounded-full' />
          ) : (
            <Icons.Clock2 className='p-0.5 w-6 h-6 bg-amber-500 text-white rounded-full' />
          )}
          <span className='text-sm text-black'>
            {item.delivered ? "تحویل شده" : "در حال پردازش"}
          </span>
        </div>
        {/* <Icons.ArrowLeft className='icon w-7 h-7' /> */}
        {item.delivered && (
          <span className='farsi-digits'>
            {moment(item.updatedAt).format("jYYYY/jM/jD")}
          </span>
        )}
      </div>
      <div className='flex justify-between lg:px-3'>
        <div>
          <span>کد سفارش</span>
          <span className='mr-2 text-sm text-black'>{item._id}</span>
        </div>
        <div className='flex items-center gap-x-1'>
          <span className='farsi-digits text-black'>
            {formatNumber(item.totalPrice - item.totalDiscount)}
          </span>
          <div className='relative w-6 h-6'>
            <Image src='/icons/toman.svg' layout='fill' />
          </div>
        </div>
      </div>
      <div className='flex gap-x-3 lg:border-t lg:border-gray-200 lg:px-3'>
        {item.cart.map((cartItem, index) => (
          <Link href={`/products/${cartItem.productID}`} key={index}>
            <a>
              <div className='relative w-16 h-16 '>
                <Image src={cartItem.img.url} layout='fill' />
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
