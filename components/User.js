import Link from "next/link";
import Image from "next/image";

import { Icons, Logout, BoxLink } from "components";

export default function User({ user }) {
  if (!user) {
    return (
      <div className='flex items-center text-sm gap-x-2 lg:border lg:border-gray-300 lg:rounded-md lg:py-2 lg:px-3'>
        <Link href='/login'>
          <a className='flex items-center gap-x-1'>
            <Icons.Login className='icon' />
            ورود
          </a>
        </Link>
        <span className='hiden lg:block lg:bg-gray-300 lg:h-6'></span>
        <Link href='/register'>
          <a className='hidden px-2 lg:block'>ثبت‌نام</a>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className='lg:hidden'>
        <Link href='/profile'>
          <a>
            <Icons.User className='icon' />
          </a>
        </Link>
      </div>
      <div
        className='hidden lg:cursor-pointer lg:relative lg:flex lg:rounded lg:p-1.5 lg:transition z-40 
          hover:bg-red-100 group '
      >
        <Icons.User className='icon' />
        <Icons.ArrowDown className='icon ' />
        <div className='absolute left-0 invisible transition duration-300 bg-white border border-gray-100 rounded shadow-md opacity-0 top-full w-60 group-hover:opacity-100 group-hover:visible'>
          <BoxLink path='/profile' name={user.name} className='border-t-0'>
            <div className='relative w-6 h-6'>
              <Image src='/icons/person.svg' layout='fill' />
            </div>
          </BoxLink>
          <Logout />
        </div>
      </div>
    </>
  );
}
