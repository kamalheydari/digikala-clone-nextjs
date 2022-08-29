import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import { useSelector } from "react-redux";

import { truncate } from "utils/truncate";

import { Buttons } from "components";

export default function UserHistory() {
  //? Store
  const { lastSeen } = useSelector((state) => state.user);

  return (
    <main>
      <Head>
        <title>پروفایل | بازدید‌های اخیر</title>
      </Head>
      <Buttons.Back backRoute='/profile'>بازدید‌های اخیر</Buttons.Back>
      <div className='section-divide-y' />
      {lastSeen.length > 0 ? (
        <div className='px-3 space-y-4 md:py-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-2 lg:grid-cols-3 md:gap-y-3'>
          {lastSeen.map((item) => (
            <article
              className='border-b md:hover:shadow-3xl md:h-64 md:border-0 '
              key={item.productID}
            >
              <Link href={`/products/${item.productID}`}>
                <a className='flex items-center gap-4 py-4 md:items-start md:flex-col'>
                  <div className='relative w-32 h-36 md:mx-auto'>
                    <Image
                      src={item.image.url}
                      layout='fill'
                      alt={item.title}         placeholder='blur'
                      blurDataURL='/placeholder.png'
                    />
                  </div>
                  <h5 className='flex-1 px-3 text-right text-gray-800 leadiri-6 md:h-32'>
                    {truncate(item.title, 80)}
                  </h5>
                </a>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <section className='py-20'>
          <div className='relative mx-auto h-52 w-52'>
            <Image src='/icons/empty-cart.svg' layout='fill' />
          </div>
          <p className='text-center'>لیست بازدید‌های اخیر شما خالی است.</p>
        </section>
      )}
    </main>
  );
}

UserHistory.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
