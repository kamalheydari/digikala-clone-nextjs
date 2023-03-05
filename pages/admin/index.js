import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { DashboardAside } from 'components'

import useUserInfo from 'hooks/useUserInfo'

export default function AdminPage() {
  const router = useRouter()

  const { userInfo, isVerify } = useUserInfo()

  if (!isVerify || userInfo?.role === 'user') router.push('/admin/login')

  if (userInfo?.role === 'admin' || userInfo?.root)
    return (
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-8xl '>
        <Head>
          <title>دیجی‌کالا | مدیریت</title>
        </Head>

        <div>
          <DashboardAside user={userInfo} />
        </div>
        <div className='hidden py-6 lg:inline-block lg:flex-1 lg:border lg:border-gray-300 lg:rounded-md lg:mt-6 h-fit'>
          <section className='py-20'>
            <div className='relative mx-auto mb-8 h-52 w-52'>
              <Image src='/icons/chart.png' layout='fill' alt='نمودار' />
            </div>

            <p className='text-center'>آنالیز وضعیت</p>
            <span className='block my-3 text-base text-center text-amber-500'>
              (بزودی)
            </span>
          </section>
        </div>
      </div>
    )
}
