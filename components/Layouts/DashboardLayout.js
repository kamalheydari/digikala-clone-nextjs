import { useSelector } from "react-redux";

import { DashboardAside } from "components";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  //? Store
  const { userInfo, token } = useSelector((state) => state.user);

  if (!token || userInfo?.role === "user") router.push("/admin/login");

  if (userInfo?.role === "admin" || userInfo?.root)
    return (
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-8xl'>
        <div className='hidden lg:block '>
          <DashboardAside user={userInfo} />
        </div>
        <div className='flex-1 py-4 lg:py-8 lg:border lg:border-gray-200 lg:rounded-md lg:mt-6 h-fit'>
          {children}
        </div>
      </div>
    );
}
