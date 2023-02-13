import Image from "next/image";
import Link from "next/link";

import {
  Icons,
  Signup,
  Cart,
  Search,
  Sidebar,
  Navbar,
  AddressBar,
} from "components";

export default function Header() {
  return (
    <>
      <header className='header'>
        <div className='header__container'>
          <div className='header__top'>
            <Sidebar />
            <Link passHref href='/'>
              <a>
                <Image
                  src='/icons/logo.svg'
                  width={96}
                  height={56}
                  alt='دیجی‌کالا'
                />
              </a>
            </Link>
            <Icons.Question className='icon lg:hidden' />
          </div>
          <div className='header__middle'>
            <div className='flex gap-x-7 flex-grow'>
              <Link passHref href='/'>
                <a className='hidden lg:block relative top-1'>
                  <Image
                    src='/icons/logo.svg'
                    width={96}
                    height={35}
                    alt='دیجی‌کالا'
                  />
                </a>
              </Link>
              <Search />
            </div>
            <div className='inline-flex items-center gap-x-4'>
              <Signup />
              <span className='hidden lg:block bg-gray-300 w-0.5 h-8' />
              <Cart />
            </div>
          </div>
        </div>
        <div className='header__bottom'>
          <Navbar />
          <AddressBar />
        </div>
      </header>
    </>
  );
}
