import Link from "next/link";
import { useRouter } from "next/router";

import { Icons } from "components";

export default function BoxLink({ children, path, name }) {
  const router = useRouter();
  return (
    <div
      className={`transition-colors hover:bg-gray-200 px-3 ${
        router.asPath === path
          ? "border-r-4 border-red-600"
          : "border-r-4 border-white"
      }`}
    >
      <Link href={path}>
        <a className='flex items-center justify-between py-4 mx-4 text-xs font-medium text-gray-700 border-t border-gray-300 gap-x-1 md:text-sm '>
          {children}
          <span className='ml-auto mr-3 text-gray-700'>{name}</span>
          <Icons.ArrowLeft className='text-gray-700 icon lg:mr-3' />
        </a>
      </Link>
    </div>
  );
}
