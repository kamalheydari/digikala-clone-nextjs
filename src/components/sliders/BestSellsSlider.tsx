import Link from 'next/link'

import { truncate } from '@/utils'
import { useGetProductsQuery } from '@/services'

import { Check } from '@/icons'
import { Skeleton, ResponsiveImage } from '@/components/ui'

interface Props {
  categorySlug: string
}

const BestSellsSlider: React.FC<Props> = (props) => {
  // ? Props
  const { categorySlug } = props

  const { products, isFetching } = useGetProductsQuery(
    {
      sort: 2,
      category: categorySlug,
      page_size: 15,
    },
    {
      selectFromResult: ({ data, isFetching }) => ({
        products: data?.products,
        isFetching,
      }),
    }
  )

  // ? Render(s)
  return (
    <section className="px-3">
      <div className="mb-3 flex items-center gap-x-2">
        <Check className="h-7 w-7 text-amber-400" />
        <h4 className="text-xl">پرفروش‌ترین کالاها</h4>
      </div>

      <div className="grid grid-flow-col grid-cols-[repeat(5,280px)] grid-rows-3 gap-x-2 overflow-x-auto p-2  md:grid-cols-[repeat(5,300px)] xl:grid-cols-[repeat(5,330px)]">
        {isFetching
          ? Array(12)
              .fill('_')
              .map((_, index) => (
                <Skeleton.Items key={index} className="flex gap-x-4 p-1">
                  <Skeleton.Item height="h-24" width="w-24" animated="background" className="mx-auto rounded-md" />
                  <Skeleton.Item height="h-5" width="w-32" animated="background" className="mx-auto mt-4" />
                </Skeleton.Items>
              ))
          : products?.map((item, index) => (
              <div key={item._id} className="w-60 p-1 md:w-72 xl:w-80">
                <Link href={`/products/${item.slug}`}>
                  <article className="flex gap-x-4">
                    <ResponsiveImage
                      dimensions="w-24 h-24"
                      src={item.images[0].url}
                      blurDataURL={item.images[0].placeholder}
                      alt={item.title}
                      imageStyles="object-contain"
                    />
                    <div className="flex items-center gap-x-3 border-b">
                      <span className="farsi-digits text-2xl text-sky-500 ">{index + 1}</span>
                      <span>{truncate(item.title, 25)}</span>
                    </div>
                  </article>
                </Link>
              </div>
            ))}
      </div>
    </section>
  )
}

export default BestSellsSlider
