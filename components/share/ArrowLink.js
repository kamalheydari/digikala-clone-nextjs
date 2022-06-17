import Link from "next/link";

import { Icons } from "components";

const ArrowLink = ({ children, path }) => {
  return (
    <Link href={path}>
      <a className='inline-flex items-center text-sm text-blue-400 max-w-max '>
        <span className='text-[11px] md:text-sm'>{children}</span>
        <Icons.ArrowLeft className='text-blue-400 icon' />
      </a>
    </Link>
  );
};

export default ArrowLink;
