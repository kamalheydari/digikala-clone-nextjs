import Head from 'next/head'
import Link from 'next/link'

import { useSelector } from 'react-redux'

import { truncate } from 'utils'

import {
  EmptyCart,
  PageContainer,
  ProfileLayout,
  ResponsiveImage,
} from 'components'
import dynamic from 'next/dynamic'

function UserHistory() {
  //? Store
  const { lastSeen } = useSelector((state) => state.user)

  //? selector
  return (
    <main>
      <Head>
        <title>پروفایل | بازدید‌های اخیر</title>
      </Head>

      <ProfileLayout>
        <PageContainer title='بازدید‌های اخیر'>
          {lastSeen.length > 0 ? (
            <div className='px-3 space-y-4 md:py-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-2 lg:grid-cols-3 md:gap-y-3'>
              {lastSeen.map((item) => (
                <article
                  className='border-b md:hover:shadow-3xl md:h-64 md:border-0 '
                  key={item.productID}
                >
                  <Link
                    href={`/products/${item.productID}`}
                    className='flex items-center gap-4 py-4 md:items-start md:flex-col'
                  >
                    <ResponsiveImage
                      dimensions='w-36 h-36'
                      className='md:mx-auto'
                      src={item.image.url}
                      alt={item.title}
                    />

                    <h5 className='flex-1 px-3 text-right text-gray-800 leadiri-6 md:h-32'>
                      {truncate(item.title, 80)}
                    </h5>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <section className='py-20'>
              <EmptyCart className='mx-auto h-52 w-52' />
              <p className='text-center'>لیست بازدید‌های اخیر شما خالی است.</p>
            </section>
          )}
        </PageContainer>
      </ProfileLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(UserHistory), { ssr: false })
