import Link from "next/link";
import { Icons } from "components";

const ArrowLink = ({ children, path }) => {
  return (
    <Link href={path}>
      <a className='inline-flex items-center text-blue-400 text-sm max-w-max '>
        <span className='uppercase'>{children}</span>
        <Icons.ArrowLeft className='icon text-blue-400' />
      </a>
    </Link>
  );
};

export default ArrowLink;
