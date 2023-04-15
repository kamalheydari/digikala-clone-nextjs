import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Header, Orders, ProfileAside } from 'components'

import { useVerify } from 'hooks'

function ProfilePage() {
  const isVerify = useVerify(false)
  const router = useRouter()

  if (!isVerify) router.push('/')
  else
    return (
      <>
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
      </>
    )
}

export default dynamic(() => Promise.resolve(ProfilePage), { ssr: false })
