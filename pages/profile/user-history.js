import Image from "next/image";

import { Buttons } from "components";

export default function UserHistory() {
  return (
    <div>
      <Buttons.Back backRoute='/profile'>بازدید‌های اخیر</Buttons.Back>
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
