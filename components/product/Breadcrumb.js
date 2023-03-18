import Link from 'next/link'

export default function Breadcrumb({ categoires }) {
  const { level_one, level_two, Level_three } = categoires

  return (
    <div className='pr-5'>
      <Link href='/'>
        <a className='inline-block px-1 py-1 text-sm text-gray-700 '>دیجی‌کالا</a>
      </Link>
      {' / '}
      <Link href={`/main/${level_one.slug}`}>
        <a className='inline-block px-1 py-1 text-sm text-gray-700 '>{level_one.name}</a>
      </Link>
      {' / '}
      <Link href={`/products?category=${level_two.slug}`}>
        <a className='inline-block px-1 py-1 text-sm text-gray-700 '>{level_two.name}</a>
      </Link>
      {' / '}
      <Link href={`/products?category=${Level_three.slug}`}>
        <a className='inline-block px-1 py-1 text-sm text-gray-700 '>{Level_three.name}</a>
      </Link>
    </div>
  )
}
