import Head from "next/head";
import { useSelector } from "react-redux";

import { Header, Orders, ProfileAside } from "components";

export default function ProfilePage() {
  //? Store
  const { userInfo } = useSelector((state) => state.user);

  if (!userInfo) return null;
  return (
    <>
      <Head>
        <title>دیجی‌کالا | پروفایل</title>
      </Head>
      <Header />
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-7xl xl:mt-28'>
        <div>
          <ProfileAside user={userInfo} />
        </div>
        <div className='hidden py-6 lg:inline-block lg:flex-1 lg:border lg:border-gray-300 lg:rounded-md lg:mt-6 h-fit'>
          <Orders />
        </div>
      </div>
    </>
  );
}
