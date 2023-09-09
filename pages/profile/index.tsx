import dynamic from 'next/dynamic'
import Head from 'next/head'

import { Header, Orders, ProfileAside, RequireUser } from 'components'

import { roles } from 'utils'

import type { NextPage } from 'next'

const ProfilePage: NextPage = () => {
  return (
    <RequireUser allowedRoles={[roles.ADMIN, roles.ROOT, roles.USER]}>
      <Head>
        <title>دیجی‌کالا | پروفایل</title>
      </Head>
      <Header />
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-7xl xl:mt-28'>
        <div>
          <ProfileAside />
        </div>
        <div className='hidden py-6 lg:inline-block lg:flex-1 lg:border lg:border-gray-300 lg:rounded-md lg:mt-6 h-fit'>
          <Orders />
        </div>
      </div>
    </RequireUser>
  )
}

export default dynamic(() => Promise.resolve(ProfilePage), { ssr: false })
