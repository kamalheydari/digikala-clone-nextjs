import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { useGetCategoriesQuery } from 'services'

import { EmptyCustomList } from 'components/emptyList'
import { DashboardLayout } from 'components/layouts'
import { DataStateDisplay, TableContainer } from 'components/shared'
import { TableSkeleton } from 'components/skeleton'
import { PageContainer } from 'components/ui'

import type { NextPage } from 'next'

const Categories: NextPage = () => {
  // ? Assets
  const { query } = useRouter()
  const parentId = query.parent_id
  const parentLvl = query.parent_lvl

  // ? Get Categories Data
  const { childCategories, ...categoriesQueryProps } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      childCategories: data?.categories.filter((category) => category.parent === parentId),
      ...rest,
    }),
  })

  // ? Render(s)
  return (
    <main>
      <Head>
        <title>مدیریت | دسته بندی ها</title>
      </Head>

      <DashboardLayout>
        <PageContainer title="دسته بندی ها">
          <DataStateDisplay
            {...categoriesQueryProps}
            dataLength={childCategories ? childCategories.length : 0}
            loadingComponent={<TableSkeleton />}
            emptyComponent={<EmptyCustomList />}
          >
            <section className="p-3">
              <div className="space-y-8 text-white">
                <div className="flex justify-between">
                  {childCategories && childCategories[0]?.level !== 0 ? (
                    <Link
                      href={`categories/create${parentId ? `?parent_id=${parentId}` : ''}&${
                        parentLvl ? `parent_lvl=${parentLvl}` : ''
                      }`}
                      className="flex max-w-max items-center gap-x-3 rounded-lg border-2 border-red-600 px-3 py-2 text-red-600"
                    >
                      افزودن دسته‌بندی جدید
                    </Link>
                  ) : (
                    <div />
                  )}
                  <Link
                    href="/admin/categories/tree"
                    className="flex max-w-max items-center gap-x-3 rounded-lg border-2 border-red-600 px-3 py-2 text-red-600"
                  >
                    نمودار دسته‌بندی ها
                  </Link>
                </div>

                <TableContainer tHeads={['نام', 'بیشتر']}>
                  {childCategories &&
                    childCategories.length > 0 &&
                    childCategories?.map((category) => (
                      <tr
                        className="border-b border-gray-100 text-center text-xs transition-colors hover:bg-gray-50/50 md:text-sm"
                        key={category._id}
                      >
                        <td className="w-3/4 px-2 py-4 text-right">{category.name}</td>
                        <td className="flex flex-wrap items-center gap-3 px-2 py-4">
                          {category.level !== 3 && (
                            <Link
                              href={`/admin/categories?parent_id=${category._id}&parent_lvl=${category.level}`}
                              className="max-w-min rounded-sm bg-green-50 px-1.5 py-1 text-green-500"
                            >
                              زیردسته ها
                            </Link>
                          )}
                          <Link
                            href={`/admin/categories/edit/${category._id}?${parentId ? `parent_id=${parentId}` : ''}&${
                              parentLvl ? `parent_lvl=${parentLvl}` : ''
                            }`}
                            className="max-w-min rounded-sm bg-amber-50 px-1.5 py-1 text-amber-500"
                          >
                            ویرایش
                          </Link>
                          {category.level === 2 && (
                            <Link
                              href={`/admin/details/${category._id}`}
                              className="max-w-min rounded-sm bg-blue-50 px-1.5 py-1 text-blue-500"
                            >
                              مشخصات و ویژگی ها
                            </Link>
                          )}
                          {category.level < 2 && (
                            <>
                              <Link
                                href={`/admin/sliders?category_id=${category._id}&category_name=${category.name}`}
                                className="max-w-min rounded-sm bg-fuchsia-50 px-1.5 py-1 text-fuchsia-500"
                              >
                                اسلایدرها
                              </Link>
                              <Link
                                href={`/admin/banners?category_id=${category._id}&category_name=${category.name}`}
                                className="max-w-min rounded-sm bg-rose-50 px-1.5 py-1 text-rose-500"
                              >
                                بنرها
                              </Link>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                </TableContainer>
              </div>
            </section>
          </DataStateDisplay>
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Categories), { ssr: false })
