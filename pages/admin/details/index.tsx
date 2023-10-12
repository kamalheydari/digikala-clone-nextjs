import dynamic from 'next/dynamic'
import Link from 'next/link'
import Head from 'next/head'

import {
  DashboardLayout,
  EmptyCustomList,
  PageContainer,
  DataStateDisplay,
  TableContainer,
  TableSkeleton,
} from 'components'

import { useGetCategoriesQuery } from 'services'

import type { NextPage } from 'next'

const DetailsHome: NextPage = () => {
  //? Get Categories
  const { categories, ...categoriesQueryProps } = useGetCategoriesQuery(
    undefined,
    {
      selectFromResult: ({ data, ...rest }) => ({
        categories: data?.categories.filter((category) => category.level === 2),
        ...rest,
      }),
    }
  )

  //? Render(s)
  return (
    <main>
      <Head>
        <title>مدیریت | مشخصات</title>
      </Head>

      <DashboardLayout>
        <PageContainer title='مشخصات'>
          <DataStateDisplay
            {...categoriesQueryProps}
            dataLength={categories ? categories.length : 0}
            loadingComponent={<TableSkeleton />}
            emptyComponent={<EmptyCustomList />}
          >
            <section className='p-3 mx-auto mb-10 space-y-8'>
              <TableContainer tHeads={['نام', 'بیشتر']}>
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
                          href={`/admin/details/${category._id}?category_name=${category.name}`}
                          className='bg-blue-50 text-blue-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block'
                        >
                          مشخصات و ویژگی ها
                        </Link>
                      </td>
                    </tr>
                  ))}
              </TableContainer>
            </section>
          </DataStateDisplay>
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(DetailsHome), { ssr: false })
