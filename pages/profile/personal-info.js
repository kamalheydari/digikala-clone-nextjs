import Head from "next/head";

import {
  Icons,
  UserMobileModal,
  UserNameModal,
  PageContainer,
} from "components";

import useUserInfo from "hooks/useUserInfo";
import useDisclosure from "hooks/useDisclosure";

export default function PersonalInfo() {
  //? Assets
  const [isShowNameModal, nameModalHandlers] = useDisclosure();
  const [isShowPhoneModal, phoneModalHandlers] = useDisclosure();

  //? Get User Data
  const { userInfo, isLoading } = useUserInfo();

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

  //? Render(s)
  return (
    <>
      {!isLoading && (
        <>
          <UserNameModal
            isShow={isShowNameModal}
            onClose={nameModalHandlers.close}
            editedData={userInfo?.name}
          />
          <UserMobileModal
            isShow={isShowPhoneModal}
            onClose={phoneModalHandlers.close}
            editedData={userInfo?.mobile}
          />
        </>
      )}

      <main>
        <Head>
          <title>پروفایل | اطلاعات حساب کاربری</title>
        </Head>
        <PageContainer title='اطلاعات حساب کاربری'>
          <section className='lg:flex'>
            <InfoField
              label='نام و نام خانوادگی'
              info={userInfo?.name}
              editHandler={nameModalHandlers.open}
              isLoading={isLoading}
            />
            <InfoField
              label='شماره موبایل'
              info={userInfo?.mobile}
              editHandler={phoneModalHandlers.open}
              isLoading={isLoading}
            />
          </section>
        </PageContainer>
      </main>
    </>
  );
}

//? Layout
PersonalInfo.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
