import Link from 'next/link'

import type { CategoryLevels } from 'pages/products/[id]'

interface Props {
  categoryLevels: CategoryLevels
}

const Breadcrumb: React.FC<Props> = ({ categoryLevels }) => {
  const { levelOne, levelTwo, LevelThree } = categoryLevels

  //? Render(s)
  return (
    <div className='pr-5'>
      <Link href='/' className='inline-block px-1 py-1 text-sm text-gray-700 '>
        دیجی‌کالا
      </Link>
      {' / '}
      <Link
        href={`/main/${levelOne.slug}`}
        className='inline-block px-1 py-1 text-sm text-gray-700 '
      >
        {levelOne.name}
      </Link>
      {' / '}
      <Link
        href={`/products?category=${levelTwo.slug}`}
        className='inline-block px-1 py-1 text-sm text-gray-700 '
      >
        {levelTwo.name}
      </Link>
      {' / '}
      <Link
        href={`/products?category=${LevelThree.slug}`}
        className='inline-block px-1 py-1 text-sm text-gray-700 '
      >
        {LevelThree.name}
      </Link>
    </div>
  )
}

export default Breadcrumb
