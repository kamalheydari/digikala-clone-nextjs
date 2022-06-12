import { ClientLayout, Orders, ProfileAside } from "components";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <ClientLayout />
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-7xl '>
        <div className=''>
          <ProfileAside user={user} />
        </div>
        <div className='py-6 hidden lg:inline-block lg:flex-1 lg:border  lg:border-gray-300 lg:rounded-md lg:mt-6 h-fit'>
          <Orders />
        </div>
      </div>
    </>
  );
}
