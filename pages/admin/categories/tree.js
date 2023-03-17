import Head from 'next/head'

import { BigLoading, PageContainer } from 'components'

import useCategory from 'hooks/useCategory'

export default function Categories() {
  //? Get Categories Data
  const { isLoading, categories } = useCategory()

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
        <title>مدیریت | نمودا دسته بندی ها</title>
      </Head>

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
              {categories.map((mainCategory) => {
                if (mainCategory.level === 1) {
                  return (
                    <li
                      key={mainCategory._id}
                      className='p-2 border border-gray-100 rounded-md shadow'
                    >
                      <div className='p-2 text-center bg-red-500 rounded'>
                        {mainCategory.name}
                      </div>
                      <ul className='flex flex-wrap gap-x-4'>
                        {categories.map((parentCategory) => {
                          if (parentCategory.parent === mainCategory._id) {
                            return (
                              <li key={parentCategory._id} className='flex-1'>
                                <div className='p-2 mt-2 text-center bg-green-500 rounded'>
                                  {parentCategory.name}
                                </div>
                                <ul className='flex flex-wrap gap-x-4'>
                                  {categories.map((childCategory) => {
                                    if (
                                      childCategory.parent ===
                                      parentCategory._id
                                    ) {
                                      return (
                                        <li
                                          key={childCategory._id}
                                          className='flex-1'
                                        >
                                          <div className='flex-1 p-2 mt-2 text-center bg-blue-500 rounded'>
                                            {childCategory.name}
                                          </div>
                                        </li>
                                      )
                                    }
                                  })}
                                </ul>
                              </li>
                            )
                          }
                        })}
                      </ul>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </section>
      </PageContainer>
    </main>
  )
}

Categories.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>
}
