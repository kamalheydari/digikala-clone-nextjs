import { BackButton } from "components";
import Image from "next/image";

export default function UserHistory() {
  return (
    <div>
      <BackButton>بازدید‌های اخیر</BackButton>
      <div className='section-divide-y' />

      <div className='py-20'>
        <div className='relative h-52 w-52 mx-auto'>
          <Image src='/icons/empty-cart.svg' layout='fill' />
        </div>

        <p className='text-center'>لیست بازدید‌های اخیر شما خالی است.</p>
      </div>
    </div>)
  }
  UserHistory.getProfileLayout = function pageLayout(page) {
    return <>{page}</>;
  };
  