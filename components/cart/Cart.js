import Link from "next/link";

import { useSelector } from "react-redux";

import { formatNumber } from "utils/formatNumber";

import { Icons } from "components";

export default function Cart() {
  const { totalItems } = useSelector((state) => state.cart);
  return (
    <div className='relative lg:border-r-2 lg:border-gray-300 lg:pr-4'>
      <span className='absolute outline outline-3  bottom-3 left-3 bg-red-500 rounded-full w-5 h-5 p-0.5 text-center text-xs text-white farsi-digits'>
        {formatNumber(totalItems)}
      </span>
      <Link href='/checkout/cart'>
        <a>
          <Icons.Cart className='icon' />
        </a>
      </Link>
    </div>
  );
}
