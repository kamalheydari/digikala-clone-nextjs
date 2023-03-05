import Head from 'next/head'
import Link from 'next/link'

import { PageContainer } from 'components'

import useCategory from 'hooks/useCategory'

export default function Categories() {
  //? Get Categories Data
  const { categories } = useCategory()

  return (
    <main>
      <Head>
        <title>مدیریت | دسته بندی ها</title>
      </Head>

      <PageContainer title='دسته بندی ها'>
        <section className='p-3'>
          <div className='space-y-8 text-white'>
            <Link href='categories/create'>
              <a className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg max-w-max gap-x-3'>
                افزودن دسته‌بندی جدید
              </a>
            </Link>

            <div className='flex text-gray-600 gap-x-3'>
              <p className='flex items-center text-sm gap-x-1'>
                <span className='inline-block w-6 h-6 bg-red-500 rounded-md' />
                دسته‌بندی اصلی
              </p>
              <p className='flex items-center text-sm gap-x-1'>
                <span className='inline-block w-6 h-6 bg-green-500 rounded-md' />
                دسته‌بندی والد
              </p>
              <p className='flex items-center text-sm gap-x-1'>
                <span className='inline-block w-6 h-6 bg-blue-500 rounded-md' />
                دسته‌بندی فرزند
              </p>
            </div>
            <ul className='space-y-8'>
              {categories.slice(0, 2).map((mainCategory) => {
                if (mainCategory.parent === '/') {
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
                          if (parentCategory.parent === mainCategory.category) {
                            return (
                              <li key={parentCategory._id} className='flex-1'>
                                <div className='p-2 mt-2 text-center bg-green-500 rounded'>
                                  {parentCategory.name}
                                </div>
                                <ul className='flex flex-wrap gap-x-4'>
                                  {categories.map((childCategory) => {
                                    if (
                                      childCategory.parent ===
                                      '/' + parentCategory.slug
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
