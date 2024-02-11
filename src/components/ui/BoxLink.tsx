import Link from 'next/link'
import { useRouter } from 'next/router'

import { ArrowLeft } from '@/icons'

interface Props {
  children: React.ReactNode
  path: string
  name: string
}

const BoxLink: React.FC<Props> = (props) => {
  // ? Props
  const { children, path, name } = props

  // ? Assets
  const router = useRouter()

  // ? Render(s)
  return (
    <div
      className={`px-3 transition-colors hover:bg-gray-200 ${
        router.pathname === path ? 'border-r-4 border-red-600' : 'border-r-4 border-white'
      }`}
    >
      <Link
        href={path}
        className="flex-center mx-4 gap-x-1 border-t border-gray-300 py-4 text-xs font-medium text-gray-700 md:text-sm"
      >
        {children}
        <span className="ml-auto mr-3 text-gray-700">{name}</span>
        <ArrowLeft className="icon text-gray-700  lg:mr-3" />
      </Link>
    </div>
  )
}

export default BoxLink
