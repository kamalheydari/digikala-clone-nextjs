import Link from 'next/link'

import { ArrowLeft } from '@/icons'

interface Props {
  children: string
  path: string
}

const ArrowLink: React.FC<Props> = (props) => {
  // ? Props
  const { children, path } = props

  // ? Render(s)
  return (
    <Link href={path} className="inline-flex max-w-max items-center text-sm text-blue-400">
      <span className="text-sky-500">{children}</span>
      <ArrowLeft className="icon text-sky-500 " />
    </Link>
  )
}

export default ArrowLink
