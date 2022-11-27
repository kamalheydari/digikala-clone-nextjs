import Image from "next/image";
import Link from "next/link";

import {
  Icons,
  User,
  Cart,
  Search,
  Sidebar,
  Navbar,
  AddressBar,
} from "components";

import useToggle from "hooks/useToggle";

export default function Header() {
  const { status: isSidebar, toggleStatus: toggleSidebar } = useToggle();

  return (
    <>
      <header className='px-4 bg-white lg:shadow xl:fixed xl:z-20 xl:top-0 xl:left-0 xl:right-0'>
        <div className='container max-w-[1700px] lg:flex lg:py-2 '>
          <div className='inline-flex items-center justify-between w-full border-b lg:border-b-0 lg:max-w-min lg:ml-8'>
            <button
              className='p-1 lg:hidden'
              type='button'
              onClick={toggleSidebar}
            >
              <Icons.Bars className='icon' />
            </button>
            <div className='relative w-24 h-14 '>
              <Link passHref href='/'>
                <a>
                  <Image src='/icons/logo.svg' layout='fill' alt='دیجی‌کالا' />
                </a>
              </Link>
            </div>
            <Icons.Question className='icon lg:hidden' />
          </div>
          <div className='inline-flex items-center justify-between w-full py-2 border-b gap-x-10 lg:border-b-0'>
            <Search />
            <div className='inline-flex items-center gap-x-4'>
              <User />
              <span className='hidden lg:block bg-gray-300 w-0.5 h-8' />
              <Cart />
            </div>
          </div>
        </div>
        <div className='py-2 flex justify-between mx-auto max-w-[1700px] relative'>
          <div className='hidden lg:block'>
            <Navbar />
          </div>
          <AddressBar />
        </div>
        <Sidebar isSidebar={isSidebar} toggleSidebar={toggleSidebar} />
      </header>
    </>
  );
}
