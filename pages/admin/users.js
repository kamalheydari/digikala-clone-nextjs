import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useGetDataQuery } from "app/slices/fetchApi.slice";
import { openModal } from "app/slices/modal.slice";

import { Buttons, Pagination, ShowWrapper, EmptyUsersList } from "components";

export default function Users() {
  const dispatch = useDispatch();

  //? Local State
  const [page, setPage] = useState(1);

  //? Store
  const { token } = useSelector((state) => state.user);

  //? Get Data Query
  const {
    data,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetDataQuery({
    url: `/api/user?page=${page}&page_size=10`,
    token,
  });

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

  return (
    <main>
      <Head>
        <title>مدیریت | کاربران</title>
      </Head>
      <Buttons.Back backRoute='/admin'>کاربران</Buttons.Back>
      <div className='section-divide-y' />

      <ShowWrapper
        error={error}
        isError={isError}
        refetch={refetch}
        isFetching={isFetching}
        isSuccess={isSuccess}
        dataLength={data ? data.usersLength : 0}
        emptyElement={<EmptyUsersList />}
        top
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
                    <div className='relative mx-auto w-7 h-7'>
                      <Image src='/icons/person.svg' layout='fill' />
                    </div>
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
                    <Buttons.Delete
                      onClick={() => deleteUserHandler(user._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ShowWrapper>

      {data?.usersLength > 10 && (
        <div className='py-4 mx-auto lg:max-w-5xl'>
          <Pagination
            currentPage={data.currentPage}
            nextPage={data.nextPage}
            previousPage={data.previousPage}
            hasNextPage={data.hasNextPage}
            hasPreviousPage={data.hasPreviousPage}
            lastPage={data.lastPage}
            setPage={setPage}
          />
        </div>
      )}
    </main>
  );
}

Users.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
