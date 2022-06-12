import { updateUser } from "app/slices/authSlice";
import { usePatchDataMutation } from "app/slices/fetchApiSlice";
import { BackButton, Icons } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editInfo } from "utils/alert";

export default function PersonalInfo() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [
    patchData,
    { data, isSuccess, isError, error },
  ] = usePatchDataMutation();

  useEffect(() => {
    if (isSuccess) dispatch(updateUser(data.user));
  }, [isSuccess]);

  const mobilEditHandler = () => {
    editInfo(
      "mobile",
      "شماره موبایل خود را وارد کنید",
      patchData,
      token,
      isError,
      error
    );
  };
  const nameEditHandler = () => {
    editInfo(
      "name",
      "نام و نام خانوادگی را وارد کنید",
      patchData,
      token,
      isError,
      error
    );
  };

  return (
    <div>
      <BackButton>اطلاعات حساب کاربری</BackButton>
      <div className='section-divide-y' />
      <div className='lg:flex'>
        <div className='px-5 flex-1'>
          <div className='flex justify-between py-4 border-b border-gray-200'>
            <p>{user.name}</p>
            {user.name ? (
              <Icons.Edit
                className='icon cursor-pointer'
                onClick={nameEditHandler}
              />
            ) : (
              <Icons.Plus
                className='icon cursor-pointer'
                onClick={nameEditHandler}
              />
            )}
          </div>
        </div>

        <div className='px-5 flex-1'>
          <div className='flex justify-between py-4 border-b border-gray-200'>
            <p>{user.mobile ? user.mobile : "شماره موبایل"}</p>
            {user.mobile ? (
              <Icons.Edit
                className='icon cursor-pointer'
                onClick={mobilEditHandler}
              />
            ) : (
              <Icons.Plus
                className='icon cursor-pointer'
                onClick={mobilEditHandler}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
PersonalInfo.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
