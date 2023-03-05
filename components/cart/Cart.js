import Link from 'next/link'

import { CartDropdown, CartTotalItems } from 'components'

export default function Cart() {
  return (
    <>
      <Link href='/checkout/cart'>
        <a className='lg:hidden'>
          <CartTotalItems />
        </a>
      </Link>

      <div className=' hidden lg:block'>
        <CartDropdown />
      </div>
    </>
  )
}
