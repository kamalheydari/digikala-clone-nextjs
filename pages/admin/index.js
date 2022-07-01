import { DashboardAside } from "components";
import { useSelector } from "react-redux";

export default function AdminPage() {
  //? Store
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "admin" || user?.root)
    return (
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-8xl '>
        <div>
          <DashboardAside user={user} />
        </div>
        <div className='hidden py-6 lg:inline-block lg:flex-1 lg:border lg:border-gray-300 lg:rounded-md lg:mt-6 h-fit'>
          <span>details comming soon </span>
        </div>
      </div>
    );

  return null;
}
