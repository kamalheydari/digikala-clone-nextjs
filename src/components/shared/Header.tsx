import Link from 'next/link'

import { Logo, Question } from '@/icons'
import { SearchModal } from '@/components/modals'
import { UserAuthLinks } from '@/components/user'
import { CartDisplay } from '@/components/cart'
import { AddressBar, Navbar, Sidebar } from '@/components/shared'

const Header = () => {
  // ? Render(s)
  return (
    <>
      <header className="bg-white px-4 lg:shadow xl:fixed xl:inset-x-0 xl:top-0 xl:z-20">
        <div className="container max-w-[1700px] lg:flex lg:py-2">
          <div className="inline-flex w-full items-center justify-between border-b lg:ml-8 lg:max-w-min lg:border-b-0">
            <Sidebar />
            <Link passHref href="/">
              <Logo className="h-14 w-24" />
            </Link>
            <Question className="icon lg:hidden" />
          </div>
          <div className="inline-flex w-full items-center justify-between gap-x-10 border-b py-2 lg:border-b-0">
            <div className="flex grow gap-x-7">
              <SearchModal />
            </div>
            <div className="inline-flex items-center gap-x-4">
              <UserAuthLinks />
              <span className="hidden h-8 w-0.5 bg-gray-300 lg:block" />
              <CartDisplay />
            </div>
          </div>
        </div>
        <div className="relative mx-auto flex max-w-[1700px] justify-between py-2">
          <Navbar />
          <AddressBar />
        </div>
      </header>
    </>
  )
}

export default Header
