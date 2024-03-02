import dynamic from 'next/dynamic'
import Head from 'next/head'

import { ClientLayout } from '@/components/Layouts'
import { ArrowLink, ResponsiveImage } from '@/components/ui'

function NotFoundPage() {
  // ? Render(s)
  return (
    <ClientLayout>
      <main className="flex flex-col items-center justify-center gap-y-6 py-8 xl:mt-28">
        <Head>
          <title>دیجی‌کالا | 404</title>
        </Head>
        <p className="text-base font-semibold text-black">صفحه‌ای که دنبال آن بودید پیدا نشد!</p>
        <ArrowLink path="/">صفحه اصلی</ArrowLink>
        <ResponsiveImage dimensions="w-full max-w-lg h-72" src="/icons/page-not-found.png" alt="404" />
      </main>
    </ClientLayout>
  )
}

export default dynamic(() => Promise.resolve(NotFoundPage), { ssr: false })
