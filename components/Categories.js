import Link from 'next/link'

import { CategoriesSkeleton, ResponsiveImage } from 'components'

import useCategory from 'hooks/useCategory'

export default function Categories(props) {
  //? Props
  const { homePage, parent, color, name } = props

  const { isLoading, childCategories } = useCategory({ parent })

  //? Render(s)
  if (isLoading) {
    return <CategoriesSkeleton />
  } else if (childCategories.length > 0 && color && name) {
    return (
      <section className='px-3'>
        <h4 className='mb-3 text-xl text-center'>
          خرید بر اساس دسته‌بندهای{' '}
          <span
            className='text-xl'
            style={{
              color,
            }}
          >
            {name}
          </span>
        </h4>
        <div className='flex flex-wrap justify-center gap-4 mx-auto space-x-4 w-fit'>
          {childCategories.map((item, index) => (
            <div key={index} className='text-center'>
              <Link
                href={
                  homePage
                    ? `/main/${item.slug}`
                    : `/products?category=${item.slug}`
                }
                className='text-center'
              >
                <ResponsiveImage
                  dimensions='w-24 h-24 lg:h-44 lg:w-44'
                  className='mx-auto mb-1'
                  src={item.image}
                  alt={item.name}
                />
                <span className='text-sm text-black'>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    )
  }
  return null
}
