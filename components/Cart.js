import Link from "next/link";
import { Icons } from "components";
import { useSelector } from "react-redux";
import { toFarsiNumber } from "utils/FarsiNumber";

export default function Cart() {
  const { totalItems } = useSelector((state) => state.cart);
  return (
    <div className='relative '>
      <span className='absolute bottom-3 left-3 bg-red-500 rounded-full w-5 h-5 p-0.5 text-center text-xs text-white'>
        {toFarsiNumber(totalItems)}
      </span>
      <Link href='/checkout/cart'>
        <a>
          <Icons.Cart className='icon' />
        </a>
      </Link>
    </div>
  );
}
