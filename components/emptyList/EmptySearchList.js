import Image from "next/image";

export default function EmptySearchList() {
  return (
    <div className='py-20'>
      <div className='relative h-60 w-60 mx-auto'>
        <Image src='/icons/empty-search.svg' layout='fill' />
      </div>
      <div className='border space-y-2 rounded-md p-2 max-w-md mx-auto'>
        <div className='flex items-center gap-x-2'>
          <div className='relative h-8 w-8'>
            <Image src='/icons/exclamation.svg' layout='fill' />
          </div>
          <h5>نتیجه‌ای یافت نشد!</h5>
        </div>
        <p className='text-gray-500'>
          از عبارت‌های متداول‌تر استفاده کنید و یا املای عبارت وارد‌شده را بررسی
          کنید.
        </p>
      </div>
    </div>
  );
}
