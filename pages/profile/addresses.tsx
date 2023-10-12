import Head from 'next/head'
import dynamic from 'next/dynamic'

import { useUserInfo } from 'hooks'

import {
  PageContainer,
  ProfileLayout,
  WithAddressModal,
  AddressSkeleton,
} from 'components'
import { Address, Edit, Location, Phone, Post, User, UserLocation } from 'icons'

import type { NextPage } from 'next'
import type { WithAddressModalProps } from 'types'

interface Props {
  addressModalProps?: WithAddressModalProps | null
}

const BasicAddresses: NextPage<Props> = ({ addressModalProps }) => {
  const { isAddress, address, isLoading, openAddressModal } =
    addressModalProps || {}

  //? Get UserInfo
  const { userInfo } = useUserInfo()

  //? Render(s)
  return (
    <main>
      <Head>
        <title>پروفایل | آدرس‌ها</title>
      </Head>
      <ProfileLayout>
        <PageContainer title='آدرس‌ها'>
          {isLoading ? (
            <AddressSkeleton />
          ) : isAddress ? (
            <section className='flex-1 px-5 '>
              <div className='flex justify-between py-4 border-b border-gray-200'>
                <p className='text-sm'>{address?.street}</p>
                <button onClick={openAddressModal}>
                  <Edit className='cursor-pointer icon' />
                </button>
              </div>
              <div className='my-2 space-y-3 text-gray-500'>
                <div className='flex items-center gap-x-2 '>
                  <UserLocation className='text-gray-500 icon' />
                  <span className='text-xs md:text-sm'>
                    {address?.province.name}, {address?.city.name}
                  </span>
                </div>
                <div className='flex items-center gap-x-2 '>
                  <Post className='text-gray-500 icon' />
                  <span className='text-xs md:text-sm'>
                    {address?.postalCode}
                  </span>
                </div>
                {userInfo?.mobile && (
                  <div className='flex items-center gap-x-2 '>
                    <Phone className='text-gray-500 icon' />
                    <span className='text-xs md:text-sm'>
                      {userInfo?.mobile}
                    </span>
                  </div>
                )}
                <div className='flex items-center gap-x-2 '>
                  <User className='text-gray-500 icon' />
                  <span className='text-xs md:text-sm'>{userInfo?.name}</span>
                </div>
              </div>
            </section>
          ) : (
            <section className='flex flex-col items-center py-20 gap-y-4'>
              <Address className='h-52 w-52' />
              <p>هنوز آدرس ثبت نکرده‌اید.</p>
              <button
                className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg gap-x-3'
                onClick={openAddressModal}
              >
                <Location className='text-red-600 icon' />
                <span>ثبت آدرس</span>
              </button>
            </section>
          )}
        </PageContainer>
      </ProfileLayout>
    </main>
  )
}

const Addresses = () => (
  <WithAddressModal>
    <BasicAddresses />
  </WithAddressModal>
)

export default dynamic(() => Promise.resolve(Addresses), { ssr: false })
