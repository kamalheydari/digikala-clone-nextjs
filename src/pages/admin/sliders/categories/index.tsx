import Link from 'next/link'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import { useGetCategoriesQuery } from '@/services'

import { EmptyCustomList } from '@/components/emptyList'
import { DashboardLayout } from '@/components/Layouts'
import { DataStateDisplay, TableContainer } from '@/components/shared'
import { TableSkeleton } from '@/components/skeleton'
import { PageContainer } from '@/components/ui'

import type { NextPage } from 'next'

const Sliders: NextPage = () => {
  // ? Queries
  //*     Get Categories
  const { categories, ...categoriesQueryProps } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      categories: data?.categories.filter((category) => category.level < 2).sort((a, b) => a.level - b.level),
      ...rest,
    }),
  })

  // ? Render(s)
  const title = 'اسلایدرها'

  return (
    <main>
      <Head>
        <title>مدیریت | {title}</title>
      </Head>

      <DashboardLayout>
        <PageContainer title={title}>
          <DataStateDisplay
            {...categoriesQueryProps}
            dataLength={categories?.length || 0}
            loadingComponent={<TableSkeleton />}
            emptyComponent={<EmptyCustomList />}
          >
            <TableContainer tHeads={['نام دسته بندی اسلایدرها', 'بیشتر']}>
              {categories &&
                categories.map((category) => (
                  <tr
                    className="border-b border-gray-100 text-center text-xs transition-colors hover:bg-gray-50/50 md:text-sm"
                    key={category._id}
                  >
                    <td className="w-3/4 px-2 py-4 text-right">{category.name}</td>
                    <td className="px-2 py-4">
                      <Link
                        href={`/admin/sliders/categories/${category._id}?category_name=${category.name}`}
                        className="mx-1.5 inline-block rounded-sm bg-rose-50 px-1.5 py-1 text-rose-500"
                      >
                        اسلایدرها
                      </Link>
                    </td>
                  </tr>
                ))}
            </TableContainer>
          </DataStateDisplay>
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Sliders), { ssr: false })
