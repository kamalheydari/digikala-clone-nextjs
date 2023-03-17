import Image from 'next/image'
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
  return (
    <>
      <header className='header'>
        <div className='header__container'>
          <div className='header__top'>
            <Sidebar />
            <Link passHref href='/'>
              <a>
                <Logo className='w-24 h-14' />
              </a>
            </Link>
            <Icons.Question className='icon lg:hidden' />
          </div>
          <div className='header__middle'>
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
        <div className='header__bottom'>
          <Navbar />
          <AddressBar />
        </div>
      </header>
    </>
  )
}
