import { useSelector } from "react-redux";

import { ClientLayout, Orders, ProfileAside } from "components";

export default function ProfilePage() {
  //? Store
  const { user } = useSelector((state) => state.user);

  if (!user) return null;
  return (
    <>
      <ClientLayout />
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-7xl xl:mt-28'>
        <div>
          <ProfileAside user={user} />
        </div>
        <div className='hidden py-6 lg:inline-block lg:flex-1 lg:border lg:border-gray-300 lg:rounded-md lg:mt-6 h-fit'>
          <Orders />
        </div>
      </div>
    </>
  );
}
