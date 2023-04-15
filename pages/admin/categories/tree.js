import dynamic from 'next/dynamic'
import Head from 'next/head'

import { BigLoading, DashboardLayout, PageContainer } from 'components'

import { useGetCategoriesQuery } from 'services'

function Categories() {
  //? Get Categories Data
  const { categoriesList, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categoriesList: data?.categoriesList,
      isLoading,
    }),
  })

  //? Render(s)

  return (
    <main>
      <Head>
        <title>مدیریت | نمودا دسته بندی ها</title>
      </Head>
      <DashboardLayout>
        {isLoading ? (
          <div className='px-3 py-20'>
            <BigLoading />
          </div>
        ) : (
          <PageContainer title='نمودار دسته بندی ها'>
            <section className='p-3'>
              <div className='space-y-8 text-white'>
                <div className='flex text-gray-600 gap-x-3'>
                  <p className='flex items-center text-sm gap-x-1'>
                    <span className='inline-block w-6 h-6 bg-red-500 rounded-md' />
                    دسته‌بندی سطح اول
                  </p>
                  <p className='flex items-center text-sm gap-x-1'>
                    <span className='inline-block w-6 h-6 bg-green-500 rounded-md' />
                    دسته‌بندی سطح دوم
                  </p>
                  <p className='flex items-center text-sm gap-x-1'>
                    <span className='inline-block w-6 h-6 bg-blue-500 rounded-md' />
                    دسته‌بندی سطح سوم
                  </p>
                </div>
                <ul className='space-y-8'>
                  {categoriesList &&
                    categoriesList.children?.map((mainCategory) => (
                      <li
                        key={mainCategory._id}
                        className='p-2 border border-gray-100 rounded-md shadow'
                      >
                        <div className='p-2 text-center bg-red-500 rounded'>
                          {mainCategory.name}
                        </div>
                        <ul className='flex flex-wrap gap-x-4'>
                          {mainCategory.children.map((parentCategory) => (
                            <li key={parentCategory._id} className='flex-1'>
                              <div className='p-2 mt-2 text-center bg-green-500 rounded'>
                                {parentCategory.name}
                              </div>
                              <ul className='flex flex-wrap gap-x-4'>
                                {parentCategory.children.map(
                                  (childCategory) => (
                                    <li
                                      key={childCategory._id}
                                      className='flex-1'
                                    >
                                      <div className='flex-1 p-2 mt-2 text-center bg-blue-500 rounded'>
                                        {childCategory.name}
                                      </div>
                                    </li>
                                  )
                                )}
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
