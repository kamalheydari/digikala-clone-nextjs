import { useDispatch, useSelector } from "react-redux";
import { openModal } from "app/slices/modalSlice";

import { Buttons, Icons } from "components";

export default function PersonalInfo() {
  const dispatch = useDispatch();

  //? Store
  const { user } = useSelector((state) => state.auth);


  //? Handlers
  const mobilEditHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "edit-mobile",
        title: "ثبت و ویرایش  شماره موبایل",
      })
    );
  };
  
  const nameEditHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "edit-name",
        title: "ثبت و ویرایش اطلاعات شناسایی",
      })
    );
  };

  return (
    <div>
      <Buttons.Back backRoute='/profile'>اطلاعات حساب کاربری</Buttons.Back>
      <div className='section-divide-y' />
      <div className='lg:flex'>
        <div className='flex-1 px-5'>
          <div className='flex items-center justify-between py-4 border-b border-gray-200'>
            <div>
              <span className='text-xs text-gray-700'>نام و نام خانوادگی</span>
              <p className='text-sm'>{user.name}</p>
            </div>
            {user.name ? (
              <Icons.Edit
                className='cursor-pointer icon'
                onClick={nameEditHandler}
              />
            ) : (
              <Icons.Plus
                className='cursor-pointer icon'
                onClick={nameEditHandler}
              />
            )}
          </div>
        </div>

        <div className='flex-1 px-5'>
          <div className='flex items-center justify-between py-4 border-b border-gray-200'>
            <div>
              <span className='text-xs text-gray-700'>شماره موبایل</span>
              <p className='text-sm'>{user.mobile ? user.mobile : "..."}</p>
            </div>
            {user.mobile ? (
              <Icons.Edit
                className='cursor-pointer icon'
                onClick={mobilEditHandler}
              />
            ) : (
              <Icons.Plus
                className='cursor-pointer icon'
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
