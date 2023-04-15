import dynamic from 'next/dynamic'
import Head from 'next/head'

import { FavoritesListEmpty, PageContainer, ProfileLayout } from 'components'

function Lists() {
  //? Render(s)
  return (
    <main>
      <Head>
        <title>پروفایل | لیست‌ها</title>
      </Head>
      <ProfileLayout>
        <PageContainer title='لیست‌ها'>
          <section className='py-20'>
            <FavoritesListEmpty className='mx-auto h-52 w-52' />
            <p className='text-center'>لیست علاقه‌مندی‌های شما خالی است.</p>
            <span className='block my-3 text-base text-center text-amber-500'>
              (بزودی)
            </span>
          </section>
        </PageContainer>
      </ProfileLayout>
    </main>
  )
}

export default dynamic(() => Promise.resolve(Lists), { ssr: false })
