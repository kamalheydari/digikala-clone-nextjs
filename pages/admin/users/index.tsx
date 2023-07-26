import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useGetUsersQuery } from 'services'

import {
  Pagination,
  ShowWrapper,
  EmptyUsersList,
  PageContainer,
  UsersTable,
  DashboardLayout,
  TableSkeleton,
} from 'components'

import { useChangeRoute } from 'hooks'
import { NextPage } from 'next'

const Users: NextPage = () => {
  //? Assets
  const { query } = useRouter()
  const page = query.page ? +query.page : 1

  const changeRoute = useChangeRoute({
    shallow: true,
  })

  //? Get User Data
  const { data, isSuccess, isFetching, error, isError, refetch } =
    useGetUsersQuery({ page })

  //? Render(s)
  return (
    <>
      <main id='_adminUsers'>
        <Head>
          <title>مدیریت | کاربران</title>
        </Head>

        <DashboardLayout>
          <PageContainer title='کاربران'>
            <ShowWrapper
              error={error}
              isError={isError}
              refetch={refetch}
              isFetching={isFetching}
              isSuccess={isSuccess}
              dataLength={data ? data.usersLength : 0}
              emptyComponent={<EmptyUsersList />}
              loadingComponent={<TableSkeleton />}
            >
              {data && <UsersTable users={data.users} />}
            </ShowWrapper>

            {data && data.usersLength > 5 && (
              <div className='py-4 mx-auto lg:max-w-5xl'>
                <Pagination
                  pagination={data.pagination}
                  changeRoute={changeRoute}
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
