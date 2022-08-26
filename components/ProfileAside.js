import Image from "next/image";
import Link from "next/link";

import { Icons, BoxLink, Logout, Orders } from "components";

export default function ProfileAside({ user }) {
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
      path: "/profile/comments",
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

  if (!user) return null;

  return (
    <aside className='sticky mt-6 lg:border lg:border-gray-200 lg:rounded-md lg:py-4 lg:top-6 xl:top-[136px]'>
      <div className='flex items-center justify-between px-5 py-2 '>
        <div className='relative w-12 h-12'>
          <Image src='/icons/person.svg' layout='fill' alt='کاربر' />
        </div>
        <div className='flex flex-col ml-auto mr-3 gap-y-1'>
          <span className='text-sm font-medium lg:text-base'>{user.name}</span>
          <span className='text-[11px] text-gray-400'>{user?.mobile}</span>
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
