import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { BigLoading, DashboardLayout, PageContainer } from 'components'

import { useGetCategoriesQuery } from 'services'

function Categories() {
  //? Assets
  const { query } = useRouter()

  //? Get Categories Data
  const { childCategories, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      childCategories: data?.categories.filter(
        (category) => category.parent === query.parent_id
      ),
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
        <title>مدیریت | دسته بندی ها</title>
      </Head>

      <DashboardLayout>
        <PageContainer title='دسته بندی ها'>
          <section className='p-3'>
            <div className='space-y-8 text-white'>
              <div className='flex justify-between'>
                {childCategories && childCategories[0].level !== 0 ? (
                  <Link
                    href={`categories/create${
                      query.parent_id ? `?parent_id=${query.parent_id}` : ''
                    }`}
                    className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg max-w-max gap-x-3'
                  >
                    افزودن دسته‌بندی جدید
                  </Link>
                ) : (
                  <div />
                )}
                <Link
                  href='/admin/categories/tree'
                  className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg max-w-max gap-x-3'
                >
                  نمودار دسته بندی ها
                </Link>
              </div>

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
                    {childCategories && childCategories.length > 0 ? (
                      childCategories?.map((category) => (
                        <tr
                          className='text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50/50 '
                          key={category._id}
                        >
                          <td className='w-3/4 px-2 py-4 text-right'>
                            {category.name}
                          </td>
                          <td className='flex flex-wrap items-center gap-3 px-2 py-4'>
                            {category.level !== 3 && (
                              <Link
                                href={`/admin/categories?parent_id=${category._id}`}
                                className='bg-green-50 text-green-500 rounded-sm py-1 px-1.5 max-w-min'
                              >
                                زیردسته ها
                              </Link>
                            )}
                            <Link
                              href={`/admin/categories/edit?id=${category._id}${
                                query.parent_id
                                  ? `&parent_id=${query.parent_id}`
                                  : ''
                              }`}
                              className='bg-amber-50 text-amber-500 rounded-sm py-1 px-1.5 max-w-min'
                            >
                              ویرایش
                            </Link>
                            {category.level === 2 && (
                              <Link
                                href={`/admin/details/${category._id}`}
                                className='bg-blue-50 text-blue-500 rounded-sm py-1 px-1.5 max-w-min'
                              >
                                مشخصات و ویژگی ها
                              </Link>
                            )}
                            {category.level < 2 && (
                              <>
                                <Link
                                  href={`/admin/sliders/${category._id}`}
                                  className='bg-fuchsia-50 text-fuchsia-500 rounded-sm py-1 px-1.5 max-w-min'
                                >
                                  اسلایدرها
                                </Link>
                                <Link
                                  href={`/admin/banners?category_id=${category._id}&category_name=${category.name}`}
                                  className='bg-rose-50 text-rose-500 rounded-sm py-1 px-1.5 max-w-min'
                                >
                                  بنرها
                                </Link>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>
                          <p className='py-4 text-xl text-center text-red-700'>
                            زیردسته ای وجود ندارد
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Categories), { ssr: false })
