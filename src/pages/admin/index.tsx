import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'

import { roles } from 'utils'

import { DashboardAdminAside } from 'components/layouts/shared'
import { ProtectedRouteWrapper } from 'components/user'

import type { NextPage } from 'next'

const AdminPage: NextPage = () => {
  return (
    <ProtectedRouteWrapper allowedRoles={[roles.ADMIN, roles.ROOT]}>
      <div className="lg:container lg:flex lg:max-w-7xl lg:gap-x-4 lg:px-3 ">
        <Head>
          <title>دیجی‌کالا | مدیریت</title>
        </Head>

        <div>
          <DashboardAdminAside />
        </div>
        <div className="hidden h-fit py-6 lg:mt-6 lg:inline-block lg:flex-1 lg:rounded-md lg:border lg:border-gray-400">
          <section className="py-20">
            <Image src="/icons/chart.png" alt="نمودار" width={208} height={208} className="mx-auto mb-8" />

            <p className="text-center">آنالیز وضعیت</p>
            <span className="my-3 block text-center text-base text-amber-600">(بزودی)</span>
          </section>
        </div>
      </div>
    </ProtectedRouteWrapper>
  )
}

export default dynamic(() => Promise.resolve(AdminPage), { ssr: false })
