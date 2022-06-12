import { BackButton } from "components";
import Image from "next/image";

export default function Addresses() {
  return (
    <div>
      <BackButton>آدرس‌ها</BackButton>
      <div className='section-divide-y' />

      <div className='py-20'>
        <div className='relative h-52 w-52 mx-auto'>
          <Image src='/images/address.svg' layout='fill' />
        </div>

        <p className='text-center'>هنوز آدرس ثبت نکرده‌اید.</p>
      </div>
    </div>
  );
}
Addresses.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
// هنوز آدرس ثبت نکرده‌اید.
