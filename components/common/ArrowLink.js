import Link from 'next/link'

import { Icons } from 'components'

const ArrowLink = ({ children, path }) => {
  return (
    <Link
      href={path}
      className='inline-flex items-center text-sm text-blue-400 max-w-max'
    >
      <span className='text-sky-500'>{children}</span>
      <Icons.ArrowLeft className='icon text-sky-500 ' />
    </Link>
  )
}

export default ArrowLink
