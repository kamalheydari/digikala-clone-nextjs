import Image from "next/image";

import { BackButton } from "components";

export default function UserHistory() {
  return (
    <div>
      <BackButton backRoute='/profile'>بازدید‌های اخیر</BackButton>
      <div className='section-divide-y' />

      <div className='py-20'>
        <div className='relative mx-auto h-52 w-52'>
          <Image src='/icons/empty-cart.svg' layout='fill' />
        </div>
        <p className='text-center'>لیست بازدید‌های اخیر شما خالی است.</p>
      </div>
    </div>
  );
}

UserHistory.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
