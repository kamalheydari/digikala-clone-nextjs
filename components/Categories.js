import Image from 'next/image'
import Link from 'next/link'

import { CategoriesSkeleton } from 'components'

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
              >
                <a className='text-center'>
                  <div className='relative w-24 h-24 mx-auto mb-1 lg:h-44 lg:w-44'>
                    <Image
                      src={item.image}
                      layout='fill'
                      alt={item.name}
                      placeholder='blur'
                      blurDataURL='/placeholder.png'
                    />
                  </div>
                  <span className='text-sm text-black'>{item.name}</span>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>
    )
  }
  return null
}
