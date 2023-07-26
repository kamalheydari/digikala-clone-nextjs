import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

import {
  DashboardLayout,
  EmptyCustomList,
  PageContainer,
  TableSkeleton,
} from 'components'

import { useGetCategoriesQuery, useGetSlidersQuery } from 'services'

import type { NextPage } from 'next'

const Sliders: NextPage = () => {
  const { query } = useRouter()
  const category_id = query?.category_id as string
  const category_name = query?.category_name

  //? Queries
  //*     Get Categories
  const { categories, isLoading: isLoading_get_categories } =
    useGetCategoriesQuery(undefined, {
      selectFromResult: ({ data, isLoading }) => ({
        categories: data?.categories
          .filter((category) => category.level < 2)
          .sort((a, b) => a.level - b.level),
        isLoading,
        skip: !!category_id,
      }),
    })

  //*     Get Sliders
  const { data: sliders, isLoading: isLoadingGetSliders } =
    useGetSlidersQuery({ category: category_id }, { skip: !!!category_id })

  //? Render(s)
  const title = category_name
    ? `اسلایدرهای دسته بندی ${category_name}`
    : 'اسلایدرها'

  const renderContent = () => {
    if (isLoading_get_categories || isLoadingGetSliders) {
      return <TableSkeleton />
    }

    if (categories && !category_id) {
      return categories.map((category) => (
        <tr
          className='text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50/50'
          key={category._id}
        >
          <td className='w-3/4 px-2 py-4 text-right'>{category.name}</td>
          <td className='px-2 py-4'>
            <Link
              href={`/admin/sliders?category_id=${category._id}&category_name=${category.name}`}
              className='bg-rose-50 text-rose-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block'
            >
              اسلایدرها
            </Link>
          </td>
        </tr>
      ))
    }

    if (sliders && sliders.length > 0) {
      return sliders.map((slider) => (
        <tr
          className='text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50/50'
          key={slider._id}
        >
          <td className='w-3/4 px-2 py-4 text-right'>{slider.title}</td>
          <td className='px-2 py-4'>
            <Link
              href={`/admin/sliders/edit/${slider._id}?slider_name=${slider.title}`}
              className='bg-rose-50 text-rose-500 rounded-sm py-1 px-1.5 mx-1.5 inline-block'
            >
              ویرایش
            </Link>
          </td>
        </tr>
      ))
    } else return <EmptyCustomList />
  }

  return (
    <main>
      <Head>
        <title>مدیریت | {title}</title>
      </Head>

      <DashboardLayout>
        <PageContainer title={title}>
          <section className='p-3 mx-auto mb-10 space-y-8'>
            {category_id && (
              <Link
                href={`sliders/create?category_id=${category_id}&category_name=${category_name}`}
                className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg max-w-max gap-x-3'
              >
                افزودن اسلایدر جدید
              </Link>
            )}
            <div className='mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10'>
              <table className='w-full whitespace-nowrap'>
                <thead className='h-9 bg-emerald-50'>
                  <tr className='text-emerald-500'>
                    <th className='px-2 text-right border-gray-100 border-x-2'>
                      {category_name
                        ? 'عنوان اسلایدرها'
                        : 'نام دسته بندی اسلایدرها'}
                    </th>
                    <th className='border-gray-100 border-x-2'>بیشتر</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600'>{renderContent()}</tbody>
              </table>
            </div>
          </section>
        </PageContainer>
      </DashboardLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Sliders), { ssr: false })
