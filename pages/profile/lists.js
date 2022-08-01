import Image from "next/image";

import { Buttons } from "components";

export default function Lists() {
  return (
    <div>
      <Buttons.Back backRoute='/profile'>لیست‌ها</Buttons.Back>
      <div className='section-divide-y' />

      <div className='py-20'>
        <div className='relative mx-auto h-52 w-52'>
          <Image src='/icons/favorites-list-empty.svg' layout='fill' />
        </div>

        <p className='text-center'>لیست علاقه‌مندی‌های شما خالی است.</p>
      </div>
    </div>
  );
}
Lists.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
