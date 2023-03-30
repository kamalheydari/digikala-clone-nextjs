import Link from 'next/link'

import {
  Icons,
  Signup,
  Cart,
  Search,
  Sidebar,
  Navbar,
  AddressBar,
  Logo,
} from 'components'

export default function Header() {
  //? Render(s)
  return (
    <>
      <header className='px-4 bg-white lg:shadow xl:fixed xl:z-20 xl:top-0 xl:left-0 xl:right-0'>
        <div className='container max-w-[1700px] lg:flex lg:py-2'>
          <div className='inline-flex items-center justify-between w-full border-b lg:border-b-0 lg:max-w-min lg:ml-8'>
            <Sidebar />
            <Link passHref href='/'>
              <Logo className='w-24 h-14' />
            </Link>
            <Icons.Question className='icon lg:hidden' />
          </div>
          <div className='inline-flex items-center justify-between w-full py-2 border-b gap-x-10 lg:border-b-0'>
            <div className='flex flex-grow gap-x-7'>
              <Search />
            </div>
            <div className='inline-flex items-center gap-x-4'>
              <Signup />
              <span className='hidden lg:block bg-gray-300 w-0.5 h-8' />
              <Cart />
            </div>
          </div>
        </div>
        <div className='py-2 flex justify-between mx-auto max-w-[1700px] relative'>
          <Navbar />
          <AddressBar />
        </div>
      </header>
    </>
  )
}
