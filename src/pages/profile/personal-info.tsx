import dynamic from 'next/dynamic'
import Head from 'next/head'

import { useUserInfo } from '@/hooks'

import { ProfileLayout } from '@/components/Layouts'
import { UserNameModal, UserMobileModal } from '@/components/modals'
import { Skeleton, PageContainer } from '@/components/ui'

import type { NextPage } from 'next'

const PersonalInfo: NextPage = () => {
  // ? Get UserInfo
  const { userInfo, isLoading } = useUserInfo()

  // ? Local Component
  const InfoField = ({
    label,
    info,
    isLoading,
    children,
  }: {
    label: string
    info: string | undefined
    isLoading: boolean
    children: React.ReactNode
  }) => (
    <div className="flex-1 px-5">
      <div className="flex items-center justify-between border-b border-gray-200 py-4">
        <div className="w-full">
          <span className="text-xs text-gray-700">{label}</span>
          {isLoading ? (
            <Skeleton.Item animated="background" height="h-5" width="w-44" />
          ) : (
            <div className="flex items-center justify-between">
              <p className="h-5 text-sm">{info}</p>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // ? Render(s)
  return (
    <main>
      <Head>
        <title>پروفایل | اطلاعات حساب کاربری</title>
      </Head>

      <ProfileLayout>
        <PageContainer title="اطلاعات حساب کاربری">
          <section className="lg:flex">
            <InfoField label="نام و نام خانوادگی" info={userInfo?.name} isLoading={isLoading}>
              <UserNameModal editedData={userInfo?.name} />
            </InfoField>
            <InfoField label="شماره موبایل" info={userInfo?.mobile} isLoading={isLoading}>
              <UserMobileModal editedData={userInfo?.mobile} />
            </InfoField>
          </section>
        </PageContainer>
      </ProfileLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(PersonalInfo), { ssr: false })
