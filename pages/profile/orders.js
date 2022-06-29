import Image from "next/image";

import { Buttons } from "components";

export default function Orders() {
  return (
    <div>
      <Buttons.Back backRoute='/profile'>تاریخچه سفارشات</Buttons.Back>
      <div className='section-divide-y' />

      <div className='py-20'>
        <div className='relative mx-auto h-52 w-52'>
          <Image src='/icons/order-empty.svg' layout='fill' />
        </div>

        <p className='text-center'>هنوز هیچ سفارشی ندادید</p>
      </div>
    </div>
  );
}
Orders.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
