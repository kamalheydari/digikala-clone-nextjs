import Link from 'next/link'
import { useRouter } from 'next/router'

import { Icons } from 'components'

interface Props {
  children: React.ReactNode
  path: string
  name: string
}

const BoxLink: React.FC<Props> = (props) => {
  //? Props
  const { children, path, name } = props

  //? Assets
  const router = useRouter()

  //? Render(s)
  return (
    <div
      className={`transition-colors hover:bg-gray-200 px-3 ${
        router.pathname === path
          ? 'border-r-4 border-red-600'
          : 'border-r-4 border-white'
      }`}
    >
      <Link
        href={path}
        className='flex-center py-4 mx-4 text-xs font-medium text-gray-700 border-t border-gray-300 gap-x-1 md:text-sm'
      >
        {children}
        <span className='ml-auto mr-3 text-gray-700'>{name}</span>
        <Icons.ArrowLeft className='icon text-gray-700  lg:mr-3' />
      </Link>
    </div>
  )
}

export default BoxLink
