import { useSelector } from "react-redux";

import { Header, ProfileAside } from "components";

export default function ProfileLayout({ children }) {
  const { userInfo } = useSelector((state) => state.user);

  if (!userInfo) return null;

  return (
    <>
      <Header />
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-7xl xl:mt-28'>
        <div className='hidden lg:block'>
          <ProfileAside user={userInfo} />
        </div>
        <div className='flex-1 py-4 lg:py-8 lg:border lg:border-gray-200 lg:rounded-md lg:mt-6 h-fit'>
          {children}
        </div>
      </div>
    </>
  );
}
