import Link from "next/link";
import { Icons } from "components";
export default function Cart() {
  return (
    <Link href='/cart'>
      <a>
        <Icons.Cart className='icon' />
      </a>
    </Link>
  );
}
