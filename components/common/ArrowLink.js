import Link from 'next/link'

import { Icons } from 'components'

const ArrowLink = ({ children, path }) => {
  return (
    <Link href={path} className='arrow-link'>
      <span className='text-sky-500'>{children}</span>
      <Icons.ArrowLeft className='icon text-sky-500 ' />
    </Link>
  )
}

export default ArrowLink
