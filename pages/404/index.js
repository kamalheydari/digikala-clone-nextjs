import Head from 'next/head'
import Image from 'next/image'

import { ArrowLink } from 'components'

export default function NotFoundPage() {
  return (
    <main className='flex flex-col items-center justify-center py-8 gap-y-6 xl:mt-28'>
      <Head>
        <title>دیجی‌کالا | 404</title>
      </Head>
      <p className='text-base font-semibold text-black'>
        صفحه‌ای که دنبال آن بودید پیدا نشد!
      </p>
      <ArrowLink path='/'>صفحه اصلی</ArrowLink>
      <div className='relative w-full max-w-lg h-72'>
        <Image src='/icons/page-not-found.png' layout='fill' alt='404' />
      </div>
    </main>
  )
}

NotFoundPage.getClientLayout = function pageLayout(page) {
  return <>{page}</>
}
