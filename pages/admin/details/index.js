import dynamic from 'next/dynamic'
import Link from 'next/link'
import Head from 'next/head'

import { BigLoading, DashboardLayout, PageContainer } from 'components'

import { useGetCategoriesQuery } from 'services'

function DetailsHome() {
  //? Get Categories
  const { categories, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categories: data?.categories.filter((category) => category.level === 2),
      isLoading,
    }),
  })

  //? Render(s)
  if (isLoading)
    return (
      <div className='px-3 py-20'>
        <BigLoading />
      </div>
    )

  return (
    <main>
      <Head>
        <title>مدیریت | مشخصات</title>
      </Head>

      <DashboardLayout>
        <PageContainer title='مشخصات'>
          <section className='p-3 mx-auto mb-10 space-y-8'>
            <div className='mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10'>
              <table className='w-full whitespace-nowrap'>
                <thead className='h-9 bg-emerald-50'>
                  <tr className='text-emerald-500'>
                    <th className='px-2 text-right border-gray-100 border-x-2'>
                      نام
                    </th>
                    <th className='border-gray-100 border-x-2'>بیشتر</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600'>
                  {categories &&
                    categories.map((category) => (
                      <tr
                        className='text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50'
                        key={category._id}
                      >
                        <td className='w-3/4 px-2 py-4 text-right'>
                          {category.name}
                        </td>
                        <td className='px-2 py-4'>
                          <Link
                            href={`/admin/details/${category._id}`}
                            className='bg-blue-50 text-blue-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block'
                          >
                            مشخصات و ویژگی ها
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(DetailsHome), { ssr: false })
