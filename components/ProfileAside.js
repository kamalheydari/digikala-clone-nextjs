import Image from "next/image";
import Link from "next/link";

import { Icons, BoxLink, Logout, Orders, Person } from "components";

import useUserInfo from "hooks/useUserInfo";

function ProfileAside() {
  const { userInfo, isLoading } = useUserInfo();

  const profilePaths = [
    {
      name: "سفارش‌ها",
      icon: <Icons.Bag className='text-black icon' />,
      path: "/profile/orders",
    },
    {
      name: "لیست‌های من",
      icon: <Icons.Heart className='text-black icon' />,
      path: "/profile/lists",
    },
    {
      name: "دیدگاه‌ها",
      icon: <Icons.Comment className='text-black icon' />,
      path: "/profile/reviews",
    },
    {
      name: "آدرس‌ها",
      icon: <Icons.Location className='text-black icon' />,
      path: "/profile/addresses",
    },
    {
      name: "بازدید‌های اخیر",
      icon: <Icons.Clock className='text-black icon' />,
      path: "/profile/user-history",
    },
    {
      name: "اطلاعات حساب کاربری",
      icon: <Icons.User className='text-black icon' />,
      path: "/profile/personal-info",
    },
  ];

  return (
    <aside className='sticky mt-6 lg:border lg:border-gray-200 lg:rounded-md lg:py-4 lg:top-6 xl:top-[136px]'>
      <div className='flex items-center justify-between px-5 py-2 '>
        <Person className='w-12 h-12' />
        <div className='flex flex-col ml-auto mr-3 gap-y-1'>
          {isLoading ? (
            <>
              <div className='animate-pulse h-5 w-32 rounded-md bg-red-200 lg:w-28 lg:h-6' />
              <div className='animate-pulse h-5 w-24 rounded-md bg-red-200 lg:w-20 lg:h-6' />
            </>
          ) : (
            <>
              <span className='text-sm font-medium lg:text-base'>
                {userInfo?.name}
              </span>
              <span className='text-[11px] text-gray-400'>
                {userInfo?.mobile}
              </span>
            </>
          )}
        </div>
        <Link href='/profile/personal-info'>
          <a>
            <Icons.Edit className='w-6 h-6 text-blue-400' />
          </a>
        </Link>
      </div>

      <div className='lg:hidden'>
        <Orders />
      </div>

      <div className='mt-7'>
        <div className='hidden lg:block'>
          <BoxLink name='خلاصه فعالیت ‌ها' path='/profile'>
            <Icons.Home className='text-black icon' />
          </BoxLink>
        </div>
        {profilePaths.map((item, index) => (
          <BoxLink key={index} path={item.path} name={item.name}>
            {item.icon}
          </BoxLink>
        ))}
        <Logout />
      </div>
    </aside>
  );
}

export default ProfileAside;
