import Link from 'next/link'
import { useRouter } from 'next/router'

import { Icons } from 'components'

export default function BoxLink({ children, path, name }) {
  const router = useRouter()
  return (
    <div
      className={`box-link ${
        router.pathname === path ? 'box-link--active' : 'box-link--deactive'
      }`}
    >
      <Link href={path} className='box-link__anchor'>
        {children}
        <span className='box-link__text'>{name}</span>
        <Icons.ArrowLeft className='box-link__icon' />
      </Link>
    </div>
  )
}
