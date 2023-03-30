import Head from 'next/head'

import { ArrowLink, ResponsiveImage } from 'components'

export default function NotFoundPage() {
  //? Render(s)
  return (
    <main className='flex flex-col items-center justify-center py-8 gap-y-6 xl:mt-28'>
      <Head>
        <title>دیجی‌کالا | 404</title>
      </Head>
      <p className='text-base font-semibold text-black'>
        صفحه‌ای که دنبال آن بودید پیدا نشد!
      </p>
      <ArrowLink path='/'>صفحه اصلی</ArrowLink>
      <ResponsiveImage
        dimensions='w-full max-w-lg h-72'
        src='/icons/page-not-found.png'
        layout='fill'
        alt='404'
      />
    </main>
  )
}

//? Layout
NotFoundPage.getClientLayout = function pageLayout(page) {
  return <>{page}</>
}
