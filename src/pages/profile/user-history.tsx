import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'

import { useAppSelector } from 'hooks'

import { truncate } from 'utils'

import { EmptyCart } from 'icons'
import { ProfileLayout } from 'components/layouts'
import { PageContainer, ResponsiveImage } from 'components/ui'

import type { NextPage } from 'next'

const UserHistory: NextPage = () => {
  // ? Store
  const { lastSeen } = useAppSelector((state) => state.lastSeen)

  // ? selector
  return (
    <main>
      <Head>
        <title>پروفایل | بازدید‌های اخیر</title>
      </Head>

      <ProfileLayout>
        <PageContainer title="بازدید‌های اخیر">
          {lastSeen.length > 0 ? (
            <div className="space-y-4 px-3 md:grid md:grid-cols-2 md:gap-x-2 md:gap-y-3 md:space-y-0 md:py-4 lg:grid-cols-3">
              {lastSeen.map((item) => (
                <article className="border-b md:h-64 md:border-0 md:hover:shadow-3xl " key={item.productID}>
                  <Link
                    href={`/products/${item.slug}`}
                    className="flex items-center gap-4 py-4 md:flex-col md:items-start"
                  >
                    <ResponsiveImage
                      dimensions="w-36 h-36"
                      className="md:mx-auto"
                      src={item.image.url}
                      blurDataURL={item.image.placeholder}
                      alt={item.title}
                    />

                    <h5 className="flex-1 px-3 text-right text-gray-800 md:h-32">{truncate(item.title, 80)}</h5>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <section className="py-20">
              <EmptyCart className="mx-auto h-52 w-52" />
              <p className="text-center">لیست بازدید‌های اخیر شما خالی است.</p>
            </section>
          )}
        </PageContainer>
      </ProfileLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(UserHistory), { ssr: false })
