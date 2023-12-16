import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useGetUsersQuery } from 'services'

import { Pagination, DataStateDisplay, EmptyUsersList, PageContainer, DashboardLayout, TableSkeleton } from 'components'
import { Person } from 'icons'

import type { NextPage } from 'next'

const Users: NextPage = () => {
  // ? Assets
  const { query } = useRouter()
  const page = query.page ? +query.page : 1

  // ? Get User Data
  const { data, ...userQueryProps } = useGetUsersQuery({ page })

  // ? Render(s)
  return (
    <>
      <main id="_adminUsers">
        <Head>
          <title>مدیریت | کاربران</title>
        </Head>

        <DashboardLayout>
          <PageContainer title="کاربران">
            <DataStateDisplay
              {...userQueryProps}
              dataLength={data ? data.usersLength : 0}
              emptyComponent={<EmptyUsersList />}
              loadingComponent={<TableSkeleton />}
            >
              <div className="mx-3 mt-7 overflow-x-auto lg:mx-5 xl:mx-10">
                <table className="w-full whitespace-nowrap">
                  <thead className="h-9 bg-green-200">
                    <tr className="text-green-600">
                      <th></th>
                      <th className="border-x-2 border-gray-300">ID</th>
                      <th>وضعیت</th>
                      <th className="border-x-2 border-gray-300">نام</th>
                      <th>ایمیل</th>
                      <th className="border-r-2 border-gray-300"></th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    {data?.users &&
                      data.users.map((user) => (
                        <tr
                          className="border-b border-gray-300 text-center text-xs transition-colors hover:bg-gray-300/70 md:text-sm"
                          key={user._id}
                        >
                          <td className="px-2 py-4">
                            <Person className="mx-auto h-7 w-7" />
                          </td>
                          <td className="px-2 py-4">{user._id}</td>
                          <td className="px-2 py-4 font-bold">
                            <span
                              className={`inline-block rounded-lg px-2 py-1.5 font-bold
              ${
                user.role === 'admin'
                  ? 'bg-blue-300 text-blue-600'
                  : user.role === 'user'
                    ? 'bg-amber-100 text-amber-600'
                    : user.role === 'root'
                      ? 'bg-green-200 text-green-600'
                      : ''
              }
              `}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-2 py-4">{user.name}</td>
                          <td className="px-2 py-4">{user.email}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </DataStateDisplay>

            {data && data.usersLength > 5 && (
              <div className="mx-auto py-4 lg:max-w-5xl">
                <Pagination pagination={data.pagination} section="_adminUsers" />
              </div>
            )}
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Users), { ssr: false })
