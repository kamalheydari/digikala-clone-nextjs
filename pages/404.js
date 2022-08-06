import Head from "next/head";
import Image from "next/image";

import { ArrowLink } from "components";

export default function NotFoundPage() {
  return (
    <main className='flex items-center justify-center flex-col gap-y-6 py-8 xl:mt-28'>
      <Head>
        <title>دیجی‌کالا | 404</title>
      </Head>
      <p className='text-black text-base font-semibold'>
        صفحه‌ای که دنبال آن بودید پیدا نشد!
      </p>
      <ArrowLink path='/'>صفحه اصلی</ArrowLink>
      <div className='relative w-full h-72 max-w-lg'>
        <Image src='/icons/page-not-found.png' layout='fill' />
      </div>
    </main>
  );
}

NotFoundPage.getClientLayout = function pageLayout(page) {
  return <>{page}</>;
};
