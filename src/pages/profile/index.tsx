import dynamic from 'next/dynamic'
import Head from 'next/head'

import { roles } from '@/utils'

import { UserProfileAside, Header } from '@/components/layouts'
import { ProtectedRouteWrapper } from '@/components/user'
import { Orders } from '@/components/order'

import type { NextPage } from 'next'

const ProfilePage: NextPage = () => {
  return (
    <ProtectedRouteWrapper allowedRoles={[roles.ADMIN, roles.ROOT, roles.USER]}>
      <Head>
        <title>دیجی‌کالا | پروفایل</title>
      </Head>
      <Header />
      <div className="lg:container lg:flex lg:max-w-7xl lg:gap-x-4 lg:px-3 xl:mt-28">
        <div>
          <UserProfileAside />
        </div>
        <div className="hidden h-fit py-6 lg:mt-6 lg:inline-block lg:flex-1 lg:rounded-md lg:border lg:border-gray-300">
          <Orders />
        </div>
      </div>
    </ProtectedRouteWrapper>
  )
}

export default dynamic(() => Promise.resolve(ProfilePage), { ssr: false })
