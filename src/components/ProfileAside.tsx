import Link from 'next/link'

import { BoxLink, Logout, Orders } from 'components'

import { useUserInfo } from 'hooks'
import { Bag, Clock, Comment, Edit, Heart, Home, Location, Person, User } from 'icons'

function ProfileAside() {
  // ? Get UserInfo
  const { userInfo, isLoading } = useUserInfo()

  const profilePaths = [
    {
      name: 'سفارش‌ها',
      Icon: Bag,
      path: '/profile/orders',
    },
    {
      name: 'لیست‌های من',
      Icon: Heart,
      path: '/profile/lists',
    },
    {
      name: 'دیدگاه‌ها',
      Icon: Comment,
      path: '/profile/reviews',
    },
    {
      name: 'آدرس‌ها',
      Icon: Location,
      path: '/profile/addresses',
    },
    {
      name: 'بازدید‌های اخیر',
      Icon: Clock,
      path: '/profile/user-history',
    },
    {
      name: 'اطلاعات حساب کاربری',
      Icon: User,
      path: '/profile/personal-info',
    },
  ]

  // ? Render(s)
  return (
    <aside className="sticky mt-6 lg:top-6 lg:rounded-md lg:border lg:border-gray-300 lg:pt-4 xl:top-[136px]">
      <div className="flex items-center justify-between px-5 py-2 ">
        <Person className="h-12 w-12" />
        <div className="ml-auto mr-3 flex flex-col gap-y-1">
          {isLoading ? (
            <>
              <div className="h-5 w-32 animate-pulse rounded-md bg-red-200 lg:h-6 lg:w-28" />
              <div className="h-5 w-24 animate-pulse rounded-md bg-red-200 lg:h-6 lg:w-20" />
            </>
          ) : (
            <>
              <span className="text-sm font-medium lg:text-base">{userInfo?.name}</span>
              <span className="text-[11px] text-gray-500">{userInfo?.mobile}</span>
            </>
          )}
        </div>
        <Link href="/profile/personal-info">
          <Edit className="h-6 w-6 text-blue-500" />
        </Link>
      </div>

      <div className="lg:hidden">
        <Orders />
      </div>

      <div className="mt-7">
        <div className="hidden lg:block">
          <BoxLink name="خلاصه فعالیت ‌ها" path="/profile">
            <Home className="icon text-black" />
          </BoxLink>
        </div>
        {profilePaths.map((item, index) => (
          <BoxLink key={index} path={item.path} name={item.name}>
            <item.Icon className="icon text-black" />
          </BoxLink>
        ))}
        <Logout />
      </div>
    </aside>
  )
}

export default ProfileAside
