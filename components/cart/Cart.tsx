import Link from 'next/link'

import { CartDropdown, CartBadge } from 'components'

export default function Cart() {
  //? Render(s)
  return (
    <>
      <Link href='/checkout/cart' className='lg:hidden'>
        <CartBadge />
      </Link>

      <div className='hidden lg:block'>
        <CartDropdown />
      </div>
    </>
  )
}
