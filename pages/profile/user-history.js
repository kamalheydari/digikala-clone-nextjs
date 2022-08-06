import Image from "next/image";
import Head from "next/head";

import { Buttons } from "components";

export default function UserHistory() {
  return (
    <main>
      <Head>
        <title>دیجی‌کالا | بازدید‌های اخیر</title>
      </Head>
      <Buttons.Back backRoute='/profile'>بازدید‌های اخیر</Buttons.Back>
      <div className='section-divide-y' />

      <section className='py-20'>
        <div className='relative mx-auto h-52 w-52'>
          <Image src='/icons/empty-cart.svg' layout='fill' />
        </div>
        <p className='text-center'>لیست بازدید‌های اخیر شما خالی است.</p>
        <span className='text-amber-500 text-base text-center block my-3'>
          (بزودی)
        </span>
      </section>
    </main>
  );
}

UserHistory.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
