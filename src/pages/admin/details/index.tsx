import dynamic from 'next/dynamic'
import Link from 'next/link'
import Head from 'next/head'

import { useGetCategoriesQuery } from '@/services'

import { EmptyCustomList } from '@/components/emptyList'
import { DashboardLayout } from '@/components/layouts'
import { DataStateDisplay, TableContainer } from '@/components/shared'
import { TableSkeleton } from '@/components/skeleton'
import { PageContainer } from '@/components/ui'

import type { NextPage } from 'next'

const DetailsHome: NextPage = () => {
  // ? Get Categories
  const { categories, ...categoriesQueryProps } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      categories: data?.categories.filter((category) => category.level === 2),
      ...rest,
    }),
  })

  // ? Render(s)
  return (
    <main>
      <Head>
        <title>مدیریت | مشخصات</title>
      </Head>

      <DashboardLayout>
        <PageContainer title="مشخصات">
          <DataStateDisplay
            {...categoriesQueryProps}
            dataLength={categories ? categories.length : 0}
            loadingComponent={<TableSkeleton />}
            emptyComponent={<EmptyCustomList />}
          >
            <section className="mx-auto mb-10 space-y-8 p-3">
              <TableContainer tHeads={['نام', 'بیشتر']}>
                {categories &&
                  categories.map((category) => (
                    <tr
                      className="border-b border-gray-100 text-center text-xs transition-colors hover:bg-gray-50 md:text-sm"
                      key={category._id}
                    >
                      <td className="w-3/4 px-2 py-4 text-right">{category.name}</td>
                      <td className="px-2 py-4">
                        <Link
                          href={`/admin/details/${category._id}?category_name=${category.name}`}
                          className="mx-1.5 inline-block rounded-sm bg-blue-50 px-1.5 py-1 text-blue-500"
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
