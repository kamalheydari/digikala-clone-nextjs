import Head from "next/head";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { openModal } from "app/slices/modal.slice";
import { useDeleteUserMutation, useGetUsersQuery } from "app/api/userApi";

import {
  Pagination,
  ShowWrapper,
  EmptyUsersList,
  HandleDelete,
  ConfirmDeleteModal,
  PageContainer,
  DeleteIconBtn,
  Person,
} from "components";

export default function Users() {
  const dispatch = useDispatch();

  //? State
  const [page, setPage] = useState(1);

  //? Store
  const { isConfirmDelete } = useSelector((state) => state.modal);

  //? Get User Data
  const {
    data,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetUsersQuery({ page });

  //? Delete User
  const [
    deleteUser,
    {
      isSuccess: isSuccess_delete,
      isLoading: isLoading_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
    },
  ] = useDeleteUserMutation();

  //? Handlers
  const deleteUserHandler = async (id) => {
    dispatch(
      openModal({
        isShow: true,
        id,
        type: "confirm-delete-user",
        title: "کاربر",
      })
    );
  };

  //? Render
  return (
    <>
      {isConfirmDelete && (
        <HandleDelete
          deleteFunc={deleteUser}
          isSuccess={isSuccess_delete}
          isError={isError_delete}
          error={error_delete}
          data={data_delete}
        />
      )}
      <ConfirmDeleteModal
        isLoading={isLoading_delete}
        isSuccess={isSuccess_delete}
      />

      <main id='adminUsers'>
        <Head>
          <title>مدیریت | کاربران</title>
        </Head>
        <PageContainer title='کاربران'>
          <ShowWrapper
            error={error}
            isError={isError}
            refetch={refetch}
            isFetching={isFetching}
            isSuccess={isSuccess}
            dataLength={data ? data.usersLength : 0}
            emptyElement={<EmptyUsersList />}
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
                  {data?.users.map((user) => (
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
                user.role === "admin"
                  ? "text-blue-600 bg-blue-50"
                  : user.role === "user"
                  ? "text-amber-600 bg-amber-50"
                  : user.root
                  ? "text-green-600 bg-green-50"
                  : ""
              }
              `}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className='px-2 py-4'>{user.name}</td>
                      <td className='px-2 py-4'>{user.email}</td>
                      <td className='px-2 py-4'>
                        <DeleteIconBtn
                          onClick={() => deleteUserHandler(user._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ShowWrapper>

          {data?.usersLength > 5 && (
            <div className='py-4 mx-auto lg:max-w-5xl'>
              <Pagination
                currentPage={data.currentPage}
                nextPage={data.nextPage}
                previousPage={data.previousPage}
                hasNextPage={data.hasNextPage}
                hasPreviousPage={data.hasPreviousPage}
                lastPage={data.lastPage}
                setPage={setPage}
                section='adminUsers'
              />
            </div>
          )}
        </PageContainer>
      </main>
    </>
  );
}

Users.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
