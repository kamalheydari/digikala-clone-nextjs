import Head from "next/head";

import { useDispatch, useSelector } from "react-redux";
import { openModal } from "app/slices/modal.slice";

import { Buttons, Icons, MobileForm, NameForm } from "components";

export default function PersonalInfo() {
  const dispatch = useDispatch();

  //? Store
  const { userInfo } = useSelector((state) => state.user);

  //? Handlers
  const mobilEditHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "edit-mobile",
        title: "ثبت و ویرایش  شماره موبایل",
        editedData: userInfo?.mobile,
      })
    );
  };

  const nameEditHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "edit-name",
        title: "ثبت و ویرایش اطلاعات شناسایی",
        editedData: userInfo?.name,
      })
    );
  };

  return (
    <>
      <NameForm />
      <MobileForm />
      
      <main>
        <Head>
          <title>پروفایل | اطلاعات حساب کاربری</title>
        </Head>
        <Buttons.Back backRoute='/profile'>اطلاعات حساب کاربری</Buttons.Back>
        <div className='section-divide-y' />
        <section className='lg:flex'>
          <div className='flex-1 px-5'>
            <div className='flex items-center justify-between py-4 border-b border-gray-200'>
              <div>
                <span className='text-xs text-gray-700'>
                  نام و نام خانوادگی
                </span>
                <p className='text-sm'>{userInfo.name}</p>
              </div>
              {userInfo.name ? (
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
                <p className='text-sm'>
                  {userInfo.mobile ? userInfo.mobile : "..."}
                </p>
              </div>
              {userInfo.mobile ? (
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
        </section>
      </main>
    </>
  );
}
PersonalInfo.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
