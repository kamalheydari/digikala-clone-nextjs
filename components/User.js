import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Icons, Logout, BoxLink } from "components";

export default function User({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <div className='flex items-center gap-x-2 lg:border lg:border-gray-300 lg:rounded-md lg:py-2 lg:px-3 text-sm'>
        <Link href='/login'>
          <a className='flex items-center gap-x-1'>
            <Icons.Login className='icon' />
            ورود
          </a>
        </Link>
        <span className='hiden lg:block lg:border lg:border-gray-300 lg:h-6'></span>
        <Link href='/register'>
          <a className='hidden lg:block px-2'>ثبت‌نام</a>
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
        className={`hidden lg:cursor-pointer lg:relative lg:flex lg:rounded lg:p-1.5 lg:transition ${
          isOpen && "bg-red-100"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.User className='icon' />
        <Icons.ArrowDown className='icon ' />
        <div
          className={` bg-white shadow-md rounded overflow-hidden absolute top-full left-0 w-60 
          border border-gray-100 ${isOpen ? "block" : "hidden"}`}
        >
          <BoxLink path='/profile' name={user.name} className='border-t-0'>
            <div className='relative w-6 h-6'>
              <Image src='/images/person.svg' layout='fill' />
            </div>
          </BoxLink>
          <Logout />
        </div>
      </div>
    </>
  );
}
