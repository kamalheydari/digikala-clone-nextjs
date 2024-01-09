import dynamic from 'next/dynamic'
import Head from 'next/head'

import { FavoritesListEmpty } from 'icons'

import { ProfileLayout } from 'components/layouts'
import { PageContainer } from 'components/ui'

import type { NextPage } from 'next'

const Lists: NextPage = () => {
  // ? Render(s)
  return (
    <main>
      <Head>
        <title>پروفایل | لیست‌ها</title>
      </Head>
      <ProfileLayout>
        <PageContainer title="لیست‌ها">
          <section className="py-20">
            <FavoritesListEmpty className="mx-auto h-52 w-52" />
            <p className="text-center">لیست علاقه‌مندی‌های شما خالی است.</p>
            <span className="my-3 block text-center text-base text-amber-500">(بزودی)</span>
          </section>
        </PageContainer>
      </ProfileLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Lists), { ssr: false })
