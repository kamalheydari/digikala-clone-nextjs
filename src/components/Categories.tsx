import Link from 'next/link'

import { ResponsiveImage } from 'components'

import type { ICategory } from 'types'

interface Props {
  homePage?: boolean
  childCategories: {
    title: string
    categories: ICategory[]
  }
  color?: string
  name: string
}

const Categories: React.FC<Props> = (props) => {
  // ? Props
  const { homePage, childCategories, color, name } = props

  // ? Re-Renders
  if (childCategories.categories.length > 0 && color && name) {
    return (
      <section className="px-3">
        <h4 className="mb-3 text-center text-xl">
          {childCategories.title}{' '}
          <span
            className="text-xl"
            style={{
              color,
            }}
          >
            {name}
          </span>
        </h4>
        <div className="mx-auto flex w-fit flex-wrap justify-center gap-4 space-x-4">
          {childCategories.categories.map((item, index) => (
            <div key={index} className="text-center">
              <Link href={homePage ? `/main/${item.slug}` : `/products?category=${item.slug}`} className="text-center">
                <ResponsiveImage
                  dimensions="w-24 h-24 lg:h-44 lg:w-44"
                  className="mx-auto mb-1"
                  src={item.image.url}
                  alt={item.name}
                  blurDataURL={item.image.placeholder}
                />
                <span className="text-sm text-black">{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    )
  }
  return null
}

export default Categories
