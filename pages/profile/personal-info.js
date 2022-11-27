import Head from "next/head";

import { useDispatch } from "react-redux";
import { openModal } from "app/slices/modal.slice";

import { Buttons, Icons, MobileForm, NameForm } from "components";

import useUserInfo from "hooks/useUserInfo";

export default function PersonalInfo() {
  const dispatch = useDispatch();

  const { userInfo, isLoading } = useUserInfo();

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

  //? Local Component
  const InfoField = ({ label, info, editHandler, isLoading }) => (
    <div className='flex-1 px-5'>
      <div className='flex items-center justify-between py-4 border-b border-gray-200'>
        <div>
          <span className='text-xs text-gray-700'>{label}</span>
          {isLoading ? (
            <div className='animate-pulse h-5 w-44 rounded-md bg-red-200' />
          ) : (
            <p className='text-sm'>{info}</p>
          )}
        </div>
        {isLoading ? null : info ? (
          <Icons.Edit className='cursor-pointer icon' onClick={editHandler} />
        ) : (
          <Icons.Plus className='cursor-pointer icon' onClick={editHandler} />
        )}
      </div>
    </div>
  );

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
          <InfoField
            label='نام و نام خانوادگی'
            info={userInfo?.name}
            editHandler={nameEditHandler}
            isLoading={isLoading}
          />
          <InfoField
            label='شماره موبایل'
            info={userInfo?.mobile}
            editHandler={mobilEditHandler}
            isLoading={isLoading}
          />
        </section>
      </main>
    </>
  );
}

PersonalInfo.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
