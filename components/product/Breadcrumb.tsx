import Link from 'next/link'
import { DataModels } from 'types'

interface Props {
  categoryLevels: DataModels.IProduct['category_levels']
}

const Breadcrumb: React.FC<Props> = ({ categoryLevels }) => {
  const { level_one, Level_three, level_two } = categoryLevels

  //? Render(s)
  return (
    <div className='pr-5'>
      <Link href='/' className='inline-block px-1 py-1 text-sm text-gray-700 '>
        دیجی‌کالا
      </Link>
      {' / '}
      <Link
        href={`/main/${level_one.slug}`}
        className='inline-block px-1 py-1 text-sm text-gray-700 '
      >
        {level_one.name}
      </Link>
      {' / '}
      <Link
        href={`/products?category=${level_two.slug}`}
        className='inline-block px-1 py-1 text-sm text-gray-700 '
      >
        {level_two.name}
      </Link>
      {' / '}
      <Link
        href={`/products?category=${Level_three.slug}`}
        className='inline-block px-1 py-1 text-sm text-gray-700 '
      >
        {Level_three.name}
      </Link>
    </div>
  )
}

export default Breadcrumb
