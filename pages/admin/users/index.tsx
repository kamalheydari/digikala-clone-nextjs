import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useGetUsersQuery } from 'services'

import {
  Pagination,
  DataStateDisplay,
  EmptyUsersList,
  PageContainer,
  DashboardLayout,
  TableSkeleton,
} from 'components'
import { Person } from 'icons'

import type { NextPage } from 'next'

const Users: NextPage = () => {
  //? Assets
  const { query } = useRouter()
  const page = query.page ? +query.page : 1

  //? Get User Data
  const { data, ...userQueryProps } = useGetUsersQuery({ page })

  //? Render(s)
  return (
    <>
      <main id='_adminUsers'>
        <Head>
          <title>مدیریت | کاربران</title>
        </Head>

        <DashboardLayout>
          <PageContainer title='کاربران'>
            <DataStateDisplay
              {...userQueryProps}
              dataLength={data ? data.usersLength : 0}
              emptyComponent={<EmptyUsersList />}
              loadingComponent={<TableSkeleton />}
            >
              <div className='mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10'>
                <table className='w-full whitespace-nowrap'>
                  <thead className='h-9 bg-emerald-50'>
                    <tr className='text-emerald-500'>
                      <th></th>
                      <th className='border-gray-100 border-x-2'>ID</th>
                      <th>وضعیت</th>
                      <th className='border-gray-100 border-x-2'>نام</th>
                      <th>ایمیل</th>
                      <th className='border-r-2 border-gray-100'></th>
                    </tr>
                  </thead>
                  <tbody className='text-gray-600'>
                    {data?.users &&
                      data.users.map((user) => (
                        <tr
                          className='text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50'
                          key={user._id}
                        >
                          <td className='px-2 py-4'>
                            <Person className='mx-auto w-7 h-7' />
                          </td>
                          <td className='px-2 py-4'>{user._id}</td>
                          <td className='px-2 py-4 font-bold'>
                            <span
                              className={`py-1.5 px-2 rounded-lg font-bold inline-block
              ${
                user.role === 'admin'
                  ? 'text-blue-600 bg-blue-50'
                  : user.role === 'user'
                  ? 'text-amber-600 bg-amber-50'
                  : user.role === 'root'
                  ? 'text-green-600 bg-green-50'
                  : ''
              }
              `}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className='px-2 py-4'>{user.name}</td>
                          <td className='px-2 py-4'>{user.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </DataStateDisplay>

            {data && data.usersLength > 5 && (
              <div className='py-4 mx-auto lg:max-w-5xl'>
                <Pagination
                  pagination={data.pagination}
                  section='_adminUsers'
                />
              </div>
            )}
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Users), { ssr: false })
