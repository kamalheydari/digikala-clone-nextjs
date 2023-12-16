import dynamic from 'next/dynamic'
import Head from 'next/head'

import { BigLoading, DashboardLayout, PageContainer } from 'components'

import { useGetCategoriesQuery } from 'services'

import type { NextPage } from 'next'

const Categories: NextPage = () => {
  // ? Get Categories Data
  const { categoriesList, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categoriesList: data?.categoriesList,
      isLoading,
    }),
  })

  // ? Render(s)
  return (
    <main>
      <Head>
        <title>مدیریت | نمودار دسته بندی ها</title>
      </Head>
      <DashboardLayout>
        {isLoading ? (
          <div className="px-3 py-20">
            <BigLoading />
          </div>
        ) : (
          <PageContainer title="نمودار دسته بندی ها">
            <section className="p-3">
              <div className="space-y-8 text-white">
                <div className="flex gap-x-3 text-gray-700">
                  <p className="flex items-center gap-x-1 text-sm">
                    <span className="inline-block h-6 w-6 rounded-md bg-red-600" />
                    دسته‌بندی سطح اول
                  </p>
                  <p className="flex items-center gap-x-1 text-sm">
                    <span className="inline-block h-6 w-6 rounded-md bg-green-600" />
                    دسته‌بندی سطح دوم
                  </p>
                  <p className="flex items-center gap-x-1 text-sm">
                    <span className="inline-block h-6 w-6 rounded-md bg-blue-600" />
                    دسته‌بندی سطح سوم
                  </p>
                </div>
                <ul className="space-y-8">
                  {categoriesList &&
                    categoriesList.children?.map((mainCategory) => (
                      <li key={mainCategory._id} className="rounded-md border border-gray-300 p-2 shadow-lg">
                        <div className="rounded bg-red-600 p-2 text-center">{mainCategory.name}</div>
                        <ul className="flex flex-wrap gap-x-4">
                          {mainCategory.children &&
                            mainCategory?.children.length > 0 &&
                            mainCategory.children.map((parentCategory) => (
                              <li key={parentCategory._id} className="flex-1">
                                <div className="mt-2 rounded bg-green-600 p-2 text-center">{parentCategory.name}</div>
                                <ul className="flex flex-wrap gap-x-4">
                                  {parentCategory.children &&
                                    parentCategory.children.length > 0 &&
                                    parentCategory.children.map((childCategory) => (
                                      <li key={childCategory._id} className="flex-1">
                                        <div className="mt-2 flex-1 rounded bg-blue-600 p-2 text-center">
                                          {childCategory.name}
                                        </div>
                                      </li>
                                    ))}
                                </ul>
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                </ul>
              </div>
            </section>
          </PageContainer>
        )}
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Categories), { ssr: false })
