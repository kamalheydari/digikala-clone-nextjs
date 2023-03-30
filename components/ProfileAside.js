import Link from 'next/link'

import { Icons, BoxLink, Logout, Orders, Person } from 'components'

import { useUserInfo } from 'hooks'

function ProfileAside() {
  const { userInfo, isLoading } = useUserInfo()

  const profilePaths = [
    {
      name: 'سفارش‌ها',
      Icon: Icons.Bag,
      path: '/profile/orders',
    },
    {
      name: 'لیست‌های من',
      Icon: Icons.Heart,
      path: '/profile/lists',
    },
    {
      name: 'دیدگاه‌ها',
      Icon: Icons.Comment,
      path: '/profile/reviews',
    },
    {
      name: 'آدرس‌ها',
      Icon: Icons.Location,
      path: '/profile/addresses',
    },
    {
      name: 'بازدید‌های اخیر',
      Icon: Icons.Clock,
      path: '/profile/user-history',
    },
    {
      name: 'اطلاعات حساب کاربری',
      Icon: Icons.User,
      path: '/profile/personal-info',
    },
  ]

  //? Render(s)
  return (
    <aside className='sticky mt-6 lg:border lg:border-gray-200 lg:rounded-md lg:pt-4 lg:top-6 xl:top-[136px]'>
      <div className='flex items-center justify-between px-5 py-2 '>
        <Person className='w-12 h-12' />
        <div className='flex flex-col ml-auto mr-3 gap-y-1'>
          {isLoading ? (
            <>
              <div className='w-32 h-5 bg-red-200 rounded-md animate-pulse lg:w-28 lg:h-6' />
              <div className='w-24 h-5 bg-red-200 rounded-md animate-pulse lg:w-20 lg:h-6' />
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
          <Icons.Edit className='w-6 h-6 text-blue-400' />
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
            <item.Icon className='icon text-black' />
          </BoxLink>
        ))}
        <Logout />
      </div>
    </aside>
  )
}

export default ProfileAside
