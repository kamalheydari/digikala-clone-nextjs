import Head from 'next/head'

import { FavoritesListEmpty, PageContainer } from 'components'

export default function Lists() {
  return (
    <main>
      <Head>
        <title>پروفایل | لیست‌ها</title>
      </Head>
      <PageContainer title='لیست‌ها'>
        <section className='py-20'>
          <FavoritesListEmpty className='mx-auto h-52 w-52' />
          <p className='text-center'>لیست علاقه‌مندی‌های شما خالی است.</p>
          <span className='block my-3 text-base text-center text-amber-500'>
            (بزودی)
          </span>
        </section>
      </PageContainer>
    </main>
  )
}
Lists.getProfileLayout = function pageLayout(page) {
  return <>{page}</>
}
