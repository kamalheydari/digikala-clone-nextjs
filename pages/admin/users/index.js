import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useState } from 'react'

import { useDeleteUserMutation, useGetUsersQuery } from 'services'

import {
  Pagination,
  ShowWrapper,
  EmptyUsersList,
  ConfirmDeleteModal,
  PageContainer,
  HandleResponse,
  UsersTable,
  DashboardLayout,
} from 'components'

import { useDisclosure, useChangeRoute } from 'hooks'

function Users() {
  //? Assets
  const { query } = useRouter()
  const changeRoute = useChangeRoute({
    shallow: true,
  })

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()

  //? State
  const [deleteInfo, setDeleteInfo] = useState({
    id: '',
  })

  //? Get User Data
  const { data, isSuccess, isFetching, error, isError, refetch } =
    useGetUsersQuery({ page: query?.page || 1 })

  //? Delete User Query
  const [
    deleteUser,
    {
      isSuccess: isSuccess_delete,
      isLoading: isLoading_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
    },
  ] = useDeleteUserMutation()

  //? Handlers
  const deleteUserHandler = (id) => {
    setDeleteInfo({ id })
    confirmDeleteModalHandlers.open()
  }

  //? Render(s)
  return (
    <>
      <ConfirmDeleteModal
        title='کاربر'
        deleteFunc={deleteUser}
        isLoading={isLoading_delete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        deleteInfo={deleteInfo}
        setDeleteInfo={setDeleteInfo}
      />
      {/* Handle Delete Response */}
      {(isSuccess_delete || isError_delete) && (
        <HandleResponse
          isError={isError_delete}
          isSuccess={isSuccess_delete}
          error={error_delete?.data?.err}
          message={data_delete?.msg}
          onSuccess={() => {
            confirmDeleteModalHandlers.close()
            setDeleteInfo({ id: '' })
          }}
          onError={() => {
            confirmDeleteModalHandlers.close()
            setDeleteInfo({ id: '' })
          }}
        />
      )}

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
            >
              <UsersTable
                deleteUserHandler={deleteUserHandler}
                users={data?.users}
              />
            </ShowWrapper>

            {data?.usersLength > 5 && (
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
