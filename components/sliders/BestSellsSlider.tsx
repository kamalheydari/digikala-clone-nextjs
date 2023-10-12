import Link from 'next/link'

import { ResponsiveImage, Skeleton } from 'components'
import { Check } from 'icons'

import { truncate } from 'utils'
import { useGetProductsQuery } from 'services'

interface Props {
  categorySlug: string
}

const BestSellsSlider: React.FC<Props> = (props) => {
  //? Props
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

  //? Render(s)
  return (
    <section className='px-3'>
      <div className='flex items-center mb-3 gap-x-2'>
        <Check className='w-7 h-7 text-amber-400' />
        <h4 className='text-xl'>پرفروش‌ترین کالاها</h4>
      </div>

      <div className='grid grid-cols-[repeat(5,280px)] md:grid-cols-[repeat(5,300px)] grid-rows-3 xl:grid-cols-[repeat(5,330px)] grid-flow-col overflow-x-auto  gap-x-2 p-2'>
        {isFetching
          ? Array(12)
              .fill('_')
              .map((_, index) => (
                <Skeleton.Items key={index} className='flex gap-x-4 p-1'>
                  <Skeleton.Item
                    height='h-24'
                    width='w-24'
                    animated='background'
                    className='rounded-md mx-auto'
                  />
                  <Skeleton.Item
                    height='h-5'
                    width='w-32'
                    animated='background'
                    className='mt-4 mx-auto'
                  />
                </Skeleton.Items>
              ))
          : products?.map((item, index) => (
              <div key={item._id} className='p-1 w-60 md:w-72 xl:w-80'>
                <Link href={`/products/${item.slug}`}>
                  <article className='flex gap-x-4'>
                    <ResponsiveImage
                      dimensions='w-24 h-24'
                      src={item.images[0].url}
                      alt={item.title}
                    />
                    <div className='flex items-center border-b gap-x-3'>
                      <span className='text-2xl farsi-digits text-sky-500 '>
                        {index + 1}
                      </span>
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
