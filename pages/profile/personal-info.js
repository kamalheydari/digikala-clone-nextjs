import dynamic from 'next/dynamic'
import Head from 'next/head'

import {
  Icons,
  UserMobileModal,
  UserNameModal,
  PageContainer,
  Skeleton,
  ProfileLayout,
} from 'components'

import { useUserInfo, useDisclosure } from 'hooks'

function PersonalInfo() {
  //? Assets
  const [isShowNameModal, nameModalHandlers] = useDisclosure()
  const [isShowPhoneModal, phoneModalHandlers] = useDisclosure()

  //? Get User Data
  const { userInfo, isLoading } = useUserInfo()

  //? Local Component
  const InfoField = ({ label, info, editHandler, isLoading }) => (
    <div className='flex-1 px-5'>
      <div className='flex items-center justify-between py-4 border-b border-gray-200'>
        <div>
          <span className='text-xs text-gray-700'>{label}</span>
          {isLoading ? (
            <Skeleton.Item animated='background' height='h-5' width='w-44' />
          ) : (
            <p className='h-5 text-sm'>{info}</p>
          )}
        </div>
        {isLoading ? null : info ? (
          <Icons.Edit className='cursor-pointer icon' onClick={editHandler} />
        ) : (
          <Icons.Plus className='cursor-pointer icon' onClick={editHandler} />
        )}
      </div>
    </div>
  )

  //? Render(s)
  return (
    <>
      {!isLoading && (
        <>
          <UserNameModal
            isShow={isShowNameModal}
            onClose={nameModalHandlers.close}
            editedData={userInfo?.name}
          />
          <UserMobileModal
            isShow={isShowPhoneModal}
            onClose={phoneModalHandlers.close}
            editedData={userInfo?.mobile}
          />
        </>
      )}

      <main>
        <Head>
          <title>پروفایل | اطلاعات حساب کاربری</title>
        </Head>

        <ProfileLayout>
          <PageContainer title='اطلاعات حساب کاربری'>
            <section className='lg:flex'>
              <InfoField
                label='نام و نام خانوادگی'
                info={userInfo?.name}
                editHandler={nameModalHandlers.open}
                isLoading={isLoading}
              />
              <InfoField
                label='شماره موبایل'
                info={userInfo?.mobile}
                editHandler={phoneModalHandlers.open}
                isLoading={isLoading}
              />
            </section>
          </PageContainer>
        </ProfileLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(PersonalInfo), { ssr: false })
