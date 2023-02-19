import Head from "next/head";

import { useDispatch } from "react-redux";
import { openModal } from "app/slices/modal.slice";

import { Address, AddressForm, Icons, PageContainer } from "components";
import useUserInfo from "hooks/useUserInfo";

export default function Addresses() {
  const dispatch = useDispatch();

  //? Get User Data
  const { userInfo, isLoading } = useUserInfo();

  //? Handlers
  const edditAddressHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "edit-address",
        title: "ثبت و ویرایش آدرس",
      })
    );
  };

  //? Render
  return (
    <>
      <AddressForm />
      <main>
        <Head>
          <title>پروفایل | آدرس‌ها</title>
        </Head>

        <PageContainer title='آدرس‌ها'>
          {isLoading ? (
            <section className='animate-pulse flex-1 px-5 '>
              <div className='flex justify-between py-4 border-b border-gray-200'>
                <p className='h-5 w-52 rounded-md bg-red-200' />
              </div>
              <div className='my-2 space-y-3 text-gray-500'>
                <div className='flex items-center gap-x-2 '>
                  <Icons.UserLocation className='text-gray-500 icon' />
                  <span className='h-5 w-44 rounded-md bg-red-200' />
                </div>
                <div className='flex items-center gap-x-2 '>
                  <Icons.Post className='text-gray-500 icon' />
                  <span className='h-5 w-44 rounded-md bg-red-200' />
                </div>
                <div className='flex items-center gap-x-2 '>
                  <Icons.Phone className='text-gray-500 icon' />
                  <span className='h-5 w-44 rounded-md bg-red-200' />
                </div>

                <div className='flex items-center gap-x-2 '>
                  <Icons.User className='text-gray-500 icon' />
                  <span className='h-5 w-44 rounded-md bg-red-200' />
                </div>
              </div>
            </section>
          ) : userInfo?.address ? (
            <section className='flex-1 px-5 '>
              <div className='flex justify-between py-4 border-b border-gray-200'>
                <p className='text-sm'>{userInfo.address.street}</p>
                <Icons.Edit
                  className='cursor-pointer icon'
                  onClick={edditAddressHandler}
                />
              </div>
              <div className='my-2 space-y-3 text-gray-500'>
                <div className='flex items-center gap-x-2 '>
                  <Icons.UserLocation className='text-gray-500 icon' />
                  <span className='text-xs md:text-sm'>
                    {userInfo.address.province?.name},{" "}
                    {userInfo.address.city?.name}
                  </span>
                </div>
                <div className='flex items-center gap-x-2 '>
                  <Icons.Post className='text-gray-500 icon' />
                  <span className='text-xs md:text-sm'>
                    {userInfo.address.postalCode}
                  </span>
                </div>
                {userInfo.mobile && (
                  <div className='flex items-center gap-x-2 '>
                    <Icons.Phone className='text-gray-500 icon' />
                    <span className='text-xs md:text-sm'>
                      {userInfo.mobile}
                    </span>
                  </div>
                )}
                <div className='flex items-center gap-x-2 '>
                  <Icons.User className='text-gray-500 icon' />
                  <span className='text-xs md:text-sm'>{userInfo.name}</span>
                </div>
              </div>
            </section>
          ) : (
            <section className='flex flex-col items-center py-20 gap-y-4'>
              <Address className='h-52 w-52' />
              <p>هنوز آدرس ثبت نکرده‌اید.</p>
              <button
                className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg gap-x-3'
                onClick={edditAddressHandler}
              >
                <Icons.Location className='text-red-600 icon' />
                <span>ثبت آدرس</span>
              </button>
            </section>
          )}
        </PageContainer>
      </main>
    </>
  );
}

Addresses.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
