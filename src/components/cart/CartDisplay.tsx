import Link from 'next/link'

import { CartDropdownMenu, CartIconBadge } from '@/components/cart'

export default function CartDisplay() {
  // ? Render(s)
  return (
    <>
      <Link href="/checkout/cart" className="lg:hidden">
        <CartIconBadge />
      </Link>

      <div className="hidden lg:block">
        <CartDropdownMenu />
      </div>
    </>
  )
}
