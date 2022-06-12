import Image from "next/image";
import { BackButton } from "components";

export default function Comments() {
  return (
    <div>
      <BackButton>دیدگاه‌ها</BackButton>
      <div className='section-divide-y' />

      <div className='py-20'>
        <div className='relative h-52 w-52 mx-auto'>
          <Image src='/images/order-empty.svg' layout='fill' />
        </div>

        <p className='text-center'>هنوز هیچ نظری ندارید</p>
      </div>
    </div>
  );
}
Comments.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};
