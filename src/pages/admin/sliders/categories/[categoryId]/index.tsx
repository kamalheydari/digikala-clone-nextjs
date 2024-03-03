import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import { useGetSlidersQuery } from '@/services'

import { EmptyCustomList } from '@/components/emptyList'
import { DashboardLayout } from '@/components/Layouts'
import { DataStateDisplay, TableContainer } from '@/components/shared'
import { TableSkeleton } from '@/components/skeleton'
import { PageContainer } from '@/components/ui'

import type { NextPage } from 'next'

const Sliders: NextPage = () => {
  const { query } = useRouter()
  const categoryId = query?.categoryId as string
  const categoryName = query?.category_name

  // ? Queries

  //*     Get Sliders
  const { data: sliders, ...slidersQueryProps } = useGetSlidersQuery({ category: categoryId })

  // ? Render(s)
  const title = `اسلایدرهای دسته بندی ${categoryName}`

  return (
    <main>
      <Head>
        <title>مدیریت | {title}</title>
      </Head>

      <DashboardLayout>
        <PageContainer title={title}>
          <DataStateDisplay
            {...slidersQueryProps}
            dataLength={sliders?.length || 0}
            loadingComponent={<TableSkeleton />}
            emptyComponent={<EmptyCustomList />}
          >
            <section className="mx-auto mb-10 space-y-8 p-3">
              {categoryId && (
                <Link
                  href={`/admin/sliders/categories/${categoryId}/create?category_name=${categoryName}`}
                  className="flex max-w-max items-center gap-x-3 rounded-lg border-2 border-red-600 px-3 py-2 text-red-600"
                >
                  افزودن اسلایدر جدید
                </Link>
              )}
              <TableContainer tHeads={['اسلایدرها', 'بیشتر']}>
                {sliders &&
                  sliders.map((slider) => (
                    <tr
                      className="border-b border-gray-100 text-center text-xs transition-colors hover:bg-gray-50/50 md:text-sm"
                      key={slider._id}
                    >
                      <td className="w-3/4 px-2 py-4 text-right">{slider.title}</td>
                      <td className="px-2 py-4">
                        <Link
                          href={`/admin/sliders/categories/${categoryId}/${slider._id}/edit?slider_name=${slider.title}`}
                          className="mx-1.5 inline-block rounded-sm bg-rose-50 px-1.5 py-1 text-rose-500"
                        >
                          ویرایش
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

export default dynamic(() => Promise.resolve(Sliders), { ssr: false })
