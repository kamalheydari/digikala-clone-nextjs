import Head from 'next/head'

import { ArrowLink, ClientLayout, ResponsiveImage } from 'components'
import dynamic from 'next/dynamic'

function NotFoundPage() {
  //? Render(s)
  return (
    <ClientLayout>
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
    </ClientLayout>
  )
}

export default dynamic(() => Promise.resolve(NotFoundPage), { ssr: false })
