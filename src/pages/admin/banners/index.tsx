import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Head from 'next/head'

import { useGetBannersQuery, useGetCategoriesQuery } from '@/services'

import { EmptyCustomList } from '@/components/emptyList'
import { DashboardLayout } from '@/components/layouts'
import { DataStateDisplay, TableContainer } from '@/components/shared'
import { TableSkeleton } from '@/components/skeleton'
import { PageContainer } from '@/components/ui'

import type { NextPage } from 'next'

const Banners: NextPage = () => {
  const { query } = useRouter()

  const category_id = query?.category_id as string
  const category_name = query?.category_name

  // ? Queries
  //*    Get Categories
  const { categories, ...categoriesQueryProps } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      categories: data?.categories.filter((category) => category.level < 2).sort((a, b) => a.level - b.level),
      ...rest,
    }),
    skip: !!category_id,
  })

  //*    Get Banners
  const { data: banners, ...bannersQueryProps } = useGetBannersQuery(
    { category: category_id },
    {
      skip: !category_id,
    }
  )

  // ? Render(s)
  const title = category_name ? `بنرهای دسته بندی ${category_name}` : 'بنرها'

  const renderContent = () => {
    // render lvl-one and lvl-two categories they can have banners
    if (categories && !category_id) {
      return (
        <DataStateDisplay
          {...categoriesQueryProps}
          dataLength={categories.length}
          loadingComponent={<TableSkeleton />}
          emptyComponent={<EmptyCustomList />}
        >
          <TableContainer tHeads={['نام دسته بندی بنرها', 'بیشتر']}>
            {categories.map((category) => (
              <tr
                className="border-b border-gray-100 text-center text-xs transition-colors hover:bg-gray-50/50 md:text-sm"
                key={category._id}
              >
                <td className="w-3/4 px-2 py-4 text-right">{category.name}</td>
                <td className="px-2 py-4">
                  <Link
                    href={`/admin/banners?category_id=${category._id}&category_name=${category.name}`}
                    className="mx-1.5 inline-block rounded-sm bg-rose-50 px-1.5 py-1 text-rose-500"
                  >
                    بنرها
                  </Link>
                </td>
              </tr>
            ))}
          </TableContainer>
        </DataStateDisplay>
      )
    }

    // render banners based on category
    if (banners && banners.length > 0) {
      return (
        <DataStateDisplay
          {...bannersQueryProps}
          dataLength={banners.length}
          loadingComponent={<TableSkeleton />}
          emptyComponent={<EmptyCustomList />}
        >
          <section className="mx-auto mb-10 space-y-8 p-3">
            {category_id && (
              <Link
                href={`banners/create?category_id=${category_id}&category_name=${category_name}`}
                className="flex max-w-max items-center gap-x-3 rounded-lg border-2 border-red-600 px-3 py-2 text-red-600"
              >
                افزودن بنر جدید
              </Link>
            )}
            <TableContainer tHeads={['عنوان بنرها', 'بیشتر']}>
              {banners.map((banner) => (
                <tr
                  className="border-b border-gray-100 text-center text-xs transition-colors hover:bg-gray-50/50 md:text-sm"
                  key={banner._id}
                >
                  <td className="w-3/4 px-2 py-4 text-right">{banner.title}</td>
                  <td className="px-2 py-4">
                    <Link
                      href={`/admin/banners/edit/${banner._id}?banner_name=${banner.title}`}
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
      )
    }
  }

  return (
    <main>
      <Head>
        <title>مدیریت | {title}</title>
      </Head>

      <DashboardLayout>
        <PageContainer title={title}>{renderContent()}</PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Banners), { ssr: false })
