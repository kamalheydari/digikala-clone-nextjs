import { useGetDataQuery } from "app/slices/fetchApiSlice";
import { BackButton, BigLoading, Icons } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, deleteUser } from "app/slices/usersSlice";
import Image from "next/image";
import { openModal } from "app/slices/modalSlice";

export default function Users() {
  const dispatch = useDispatch();

  //? Store
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);

  //? Get Data Query
  const { data, isLoading, isSuccess } = useGetDataQuery({
    url: "/api/user",
    token,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(addUsers(data.users));
    }
  }, [isSuccess]);

  //? Handlers
  const deleteUserHandler = async (id) => {
    dispatch(
      openModal({ isShow: true, id, type: "confirm-delete-user", title: "کاربر" })
    );
  };

  return (
    <>
      <BackButton backRoute='/admin'>کاربران</BackButton>
      <div className='section-divide-y' />
      {isLoading && (
        <div className='px-3 py-20'>
          <BigLoading />
        </div>
      )}
      <div className='px-3'>
        {isSuccess && (
          <div className='overflow-x-auto mt-7'>
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
                {users.map((user) => (
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
                      <button
                        type='button'
                        onClick={() => deleteUserHandler(user._id)}
                      >
                        <Icons.Delete className='mx-auto text-red-600 icon' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

Users.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
