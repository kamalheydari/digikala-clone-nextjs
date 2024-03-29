import Link from 'next/link'
import { useRouter } from 'next/router'

import { useUserInfo } from '@/hooks'

import { Login, User } from '@/icons'
import { UserMenuDropdown } from '@/components/user'
import { Skeleton } from '@/components/ui'

const UserAuthLinks = () => {
  const { asPath } = useRouter()

  // ? Get UserInfo
  const { userInfo, isLoading } = useUserInfo()

  // ? Render(s)
  if (isLoading) return <Skeleton.Item height="h-8" width="w-7 lg:w-12" animated="background" />
  else if (!userInfo) {
    return (
      <div className="flex-center gap-x-2 text-sm lg:rounded-md lg:border lg:border-gray-300 lg:px-3 lg:py-2">
        <Link href={`/authentication/login?redirectTo=${asPath}`} className="flex-center gap-x-1">
          <Login className="icon" />
          ورود
        </Link>
        <span className="hidden w-0.5 lg:block lg:h-6 lg:bg-gray-300" />
        <Link href={`/authentication/register?redirectTo=${asPath}`} className="hidden px-2 lg:block">
          ثبت‌نام
        </Link>
      </div>
    )
  } else if (userInfo) {
    return (
      <>
        <div className="lg:hidden">
          <Link href="/profile">
            <User className="icon h-7 w-7" />
          </Link>
        </div>
        <div className="hidden lg:block">
          <UserMenuDropdown name={userInfo.name} />
        </div>
      </>
    )
  }
}

export default UserAuthLinks
