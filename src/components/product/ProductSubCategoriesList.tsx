import Link from 'next/link'

import { useGetSubCategoriesQuery } from '@/services'
import { generateQueryParams } from '@/utils'

import { SubCategoriesSkeleton } from '@/components/skeleton'
import { ResponsiveImage } from '@/components/ui'

interface Props {
  category: string
}

const ProductSubCategoriesList: React.FC<Props> = (props) => {
  const { category } = props

  const { childCategories, isLoading } = useGetSubCategoriesQuery(
    { slug: category },
    {
      skip: !category,
      selectFromResult: ({ isLoading, data }) => ({
        childCategories: data?.children,
        isLoading,
      }),
    }
  )

  // ? Render(s)
  return (
    <section className="my-7 ps-4 md:px-4">
      {isLoading ? (
        <SubCategoriesSkeleton />
      ) : childCategories && childCategories.length > 0 ? (
        <>
          <h4 className="mb-4 text-base text-black lg:pt-4">دسته‌بندی‌ها</h4>
          <div className="flex gap-3 overflow-x-auto pb-3">
            {childCategories.map((item) => (
              <Link
                key={item._id}
                href={`/products?${generateQueryParams({
                  category: item.slug,
                  sort: '',
                })}`}
                className="rounded-md border-4 border-gray-100 px-3 pb-2 pt-4 text-center"
              >
                <ResponsiveImage
                  dimensions="w-24 h-24 md:h-32 md:w-32 xl:w-40 xl:h-40"
                  src={item.image.url}
                  blurDataURL={item.image.placeholder}
                  alt={item.name}
                  imageStyles="object-contain"
                />

                <span className="mt-2 inline-block">{item.name}</span>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}

export default ProductSubCategoriesList
