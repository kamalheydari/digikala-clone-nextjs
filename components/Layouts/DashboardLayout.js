import { useSelector } from "react-redux";

import { DashboardAside } from "components";

export default function DashboardLayout({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (user.role !== "admin") return null;

  return (
    <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-7xl'>
        <div className='hidden lg:block '>
          <DashboardAside  user={user} />
        </div>
        <div className='flex-1 py-4 lg:py-8 lg:border lg:border-gray-200 lg:rounded-md lg:mt-6 h-fit'>
          {children}
        </div>
      </div>
  );
}
