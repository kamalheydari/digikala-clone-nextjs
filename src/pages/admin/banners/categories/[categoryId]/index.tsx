import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Head from 'next/head'

import { useGetBannersQuery } from '@/services'

import { EmptyCustomList } from '@/components/emptyList'
import { DashboardLayout } from '@/components/Layouts'
import { DataStateDisplay, TableContainer } from '@/components/shared'
import { TableSkeleton } from '@/components/skeleton'
import { PageContainer } from '@/components/ui'

import type { NextPage } from 'next'

const Banners: NextPage = () => {
  const { query } = useRouter()

  const categoryId = query?.categoryId as string
  const categoryName = query?.category_name

  // ? Queries
  //*    Get Banners
  const { data: banners, ...bannersQueryProps } = useGetBannersQuery({ category: categoryId })

  // ? Render(s)
  const title = `بنرهای دسته بندی ${categoryName}`

  return (
    <main>
      <Head>
        <title>مدیریت | {title}</title>
      </Head>

      <DashboardLayout>
        <PageContainer title={title}>
          <DataStateDisplay
            {...bannersQueryProps}
            dataLength={banners ? banners.length : 0}
            loadingComponent={<TableSkeleton />}
            emptyComponent={<EmptyCustomList />}
          >
            <section className="mx-auto mb-10 space-y-8 p-3">
              {categoryId && (
                <Link
                  href={`/admin/banners/categories/${categoryId}/create`}
                  className="flex max-w-max items-center gap-x-3 rounded-lg border-2 border-red-600 px-3 py-2 text-red-600"
                >
                  افزودن بنر جدید
                </Link>
              )}
              <TableContainer tHeads={['عنوان بنرها', 'بیشتر']}>
                {banners &&
                  banners.map((banner) => (
                    <tr
                      className="border-b border-gray-100 text-center text-xs transition-colors hover:bg-gray-50/50 md:text-sm"
                      key={banner._id}
                    >
                      <td className="w-3/4 px-2 py-4 text-right">{banner.title}</td>
                      <td className="px-2 py-4">
                        <Link
                          href={`/admin/banners/categories/${categoryId}/${banner._id}/edit?banner_name=${banner.title}`}
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

export default dynamic(() => Promise.resolve(Banners), { ssr: false })
