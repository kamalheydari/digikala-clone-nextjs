import { DashboardAside } from "components";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function AdminPage() {
  const router = useRouter();

  //? Store
  const { user, token } = useSelector((state) => state.auth);

  if (!token || user?.role === "user") router.push("/admin/login");

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
}
