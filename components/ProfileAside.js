import Image from "next/image";
import Link from "next/link";

import { Icons, BoxLink, Logout, Orders } from "components";

export default function ProfileAside({ user }) {
  const profilePaths = [
    {
      name: "سفارش‌ها",
      icon: <Icons.Bag className='icon text-black' />,
      path: "/profile/orders",
    },
    {
      name: "لیست‌های من",
      icon: <Icons.Heart className='icon text-black' />,
      path: "/profile/lists",
    },
    {
      name: "دیدگاه‌ها",
      icon: <Icons.Comment className='icon text-black' />,
      path: "/profile/comments",
    },
    {
      name: "آدرس‌ها",
      icon: <Icons.Location className='icon text-black' />,
      path: "/profile/addresses",
    },
    {
      name: "بازدید‌های اخیر",
      icon: <Icons.Clock className='icon text-black' />,
      path: "/profile/user-history",
    },
    {
      name: "اطلاعات حساب کاربری",
      icon: <Icons.User className='icon text-black' />,
      path: "/profile/personal-info",
    },
  ];

  if (!user) return null;

  return (
    <aside className='mt-6 lg:border lg:border-gray-200 lg:rounded-md lg:py-4'>
      <div className='px-5 py-2 flex justify-between items-center '>
        <div className='relative w-12 h-12'>
          <Image src='/icons/person.svg' layout='fill' />
        </div>
        <span className='ml-auto mr-2 font-bold '>{user.name}</span>
        <Link href='/profile/personal-info'>
          <a>
            <Icons.Edit className='text-blue-400 w-6 h-6' />
          </a>
        </Link>
      </div>

      <div className='lg:hidden'>
        <Orders />
      </div>

      <div className='mt-7'>
        <div className='hidden lg:block'>
          <BoxLink name='خلاصه فعالیت ‌ها' path='/profile'>
            <Icons.Home className='icon text-black' />
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
