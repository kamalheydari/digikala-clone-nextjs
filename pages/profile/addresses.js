import Head from 'next/head'
import dynamic from 'next/dynamic'

import {
  Address,
  Icons,
  PageContainer,
  Skeleton,
  ProfileLayout,
} from 'components'

import { withAddressModal } from 'HOCs/withAddressModal'

import { useUserInfo } from 'hooks'

function Addresses() {
  //? Get User Data
  const { userInfo, isLoading } = useUserInfo()

  //? Handlers
  const edditAddressHandler = () => addressModalHandlers.open()

  //? Local Components
  const ChangeAddress = withAddressModal(({ openAddressModal }) => (
    <button onClick={openAddressModal}>
      <Icons.Edit className='cursor-pointer icon' />
    </button>
  ))

  //? Render(s)
  return (
    <main>
      <Head>
        <title>پروفایل | آدرس‌ها</title>
      </Head>
      <ProfileLayout>
        <PageContainer title='آدرس‌ها'>
          {isLoading ? (
            <section className='flex-1 px-5 '>
              <div className='flex justify-between py-4 border-b border-gray-200'>
                <Skeleton.Item
                  animated='background'
                  height='h-5'
                  width='w-52'
                />
              </div>
              <div className='my-2 space-y-3 text-gray-500'>
                <div className='flex items-center gap-x-2 '>
                  <Icons.UserLocation className='text-gray-500 icon' />
                  <Skeleton.Item
                    animated='background'
                    height='h-5'
                    width='w-40'
                  />
                </div>
                <div className='flex items-center gap-x-2 '>
                  <Icons.Post className='text-gray-500 icon' />
                  <Skeleton.Item
                    animated='background'
                    height='h-5'
                    width='w-40'
                  />
                </div>
                <div className='flex items-center gap-x-2 '>
                  <Icons.Phone className='text-gray-500 icon' />
                  <Skeleton.Item
                    animated='background'
                    height='h-5'
                    width='w-40'
                  />
                </div>

                <div className='flex items-center gap-x-2 '>
                  <Icons.User className='text-gray-500 icon' />
                  <Skeleton.Item
                    animated='background'
                    height='h-5'
                    width='w-40'
                  />
                </div>
              </div>
            </section>
          ) : userInfo?.address ? (
            <section className='flex-1 px-5 '>
              <div className='flex justify-between py-4 border-b border-gray-200'>
                <p className='text-sm'>{userInfo.address.street}</p>
                <ChangeAddress />
              </div>
              <div className='my-2 space-y-3 text-gray-500'>
                <div className='flex items-center gap-x-2 '>
                  <Icons.UserLocation className='text-gray-500 icon' />
                  <span className='text-xs md:text-sm'>
                    {userInfo.address.province?.name},{' '}
                    {userInfo.address.city?.name}
                  </span>
                </div>
                <div className='flex items-center gap-x-2 '>
                  <Icons.Post className='text-gray-500 icon' />
                  <span className='text-xs md:text-sm'>
                    {userInfo.address.postalCode}
                  </span>
                </div>
                {userInfo.mobile && (
                  <div className='flex items-center gap-x-2 '>
                    <Icons.Phone className='text-gray-500 icon' />
                    <span className='text-xs md:text-sm'>
                      {userInfo.mobile}
                    </span>
                  </div>
                )}
                <div className='flex items-center gap-x-2 '>
                  <Icons.User className='text-gray-500 icon' />
                  <span className='text-xs md:text-sm'>{userInfo.name}</span>
                </div>
              </div>
            </section>
          ) : (
            <section className='flex flex-col items-center py-20 gap-y-4'>
              <Address className='h-52 w-52' />
              <p>هنوز آدرس ثبت نکرده‌اید.</p>
              <button
                className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg gap-x-3'
                onClick={edditAddressHandler}
              >
                <Icons.Location className='text-red-600 icon' />
                <span>ثبت آدرس</span>
              </button>
            </section>
          )}
        </PageContainer>
      </ProfileLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Addresses), { ssr: false })
