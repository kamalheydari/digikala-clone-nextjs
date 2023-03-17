import Image from 'next/image'
import Link from 'next/link'

import { SubCategoriesSkeleton } from 'components'

import useCategory from 'hooks/useCategory'

export default function SubCategories(props) {
  const { categoryID } = props
  const { childCategories, isLoading } = useCategory({
    parent: categoryID,
  })

  if (isLoading) return <SubCategoriesSkeleton />
  else if (childCategories.length > 0)
    return (
      <section className='px-4 my-7'>
        <h4 className='mb-4 text-base text-black lg:pt-4'>دسته‌بندی‌ها</h4>
        <div className='flex gap-3 pb-3 overflow-x-auto'>
          {childCategories.map((item) => (
            <Link key={item._id} href={`/products?category=${item.slug}`}>
              <a className='px-3 pt-4 pb-2 text-center border-4 border-gray-100 rounded-md'>
                <div className='relative w-24 h-24 md:h-32 md:w-32 xl:w-40 xl:h-40'>
                  <Image
                    src={item.image}
                    layout='fill'
                    alt={item.name}
                    placeholder='blur'
                    blurDataURL='/placeholder.png'
                  />
                </div>
                <span className='inline-block mt-2'>{item.name}</span>
              </a>
            </Link>
          ))}
        </div>
      </section>
    )
  else return null
}
