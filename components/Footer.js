import Image from "next/image";

import { Icons, Services } from "components";

export default function Footer() {
  return (
    <footer className='border-t border-gray-200 pt-4 mt-8'>
      <div className='px-3 lg:max-w-[1550px] space-y-8 mx-auto '>
        {/* Logo & scroll to top */}
        <div className='flex justify-between'>
          <div>
            <div className='relative w-32 h-10 mb-6'>
              <Image src='/icons/logoPersian.svg' layout='fill' />
            </div>
            <div className='flex flex-col gap-y-2 lg:flex-row lg:gap-x-5'>
              <span>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</span>
              <span className='hidden lg:block bg-gray-300 w-[2px]' />
              <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
            </div>
          </div>
          <div>
            <button
              type='button'
              onClick={() => window.scrollTo(0, 0)}
              className='flex items-center border border-gray-300 rounded-md px-3 py-1'
            >
              <span className='text-sm'>بازگشت به بالا</span>
              <Icons.ArrowUp className='h-7 w-7 text-gray-400' />
            </button>
          </div>
        </div>

        <div className='hidden lg:block'>
          <Services />
        </div>

        <div className='space-y-8 lg:flex lg:items-start lg:justify-between'>
          {/* socials */}
          <div className='flex items-center justify-between'>
            <p className='lg:ml-20'>همراه ما باشید!</p>
            <div className='flex gap-x-8'>
              <Icons.Twitter className='text-gray-400 w-8 h-8' />
              <Icons.Linkedin className='text-gray-400 w-8 h-8' />
              <Icons.Instagram className='text-gray-400 w-8 h-8' />
              <Icons.Youtube className='text-gray-400 w-8 h-8' />
            </div>
          </div>

          {/* Newslatter */}
          <div className="flex-1 max-w-lg">
            <form className='flex gap-x-3'>
              <input placeholder='ایمیل شما' className='input' type='email' />
              <button
                type='submit'
                className=' bg-gray-200 text-white px-2 rounded-md'
              >
                ثبت
              </button>
            </form>
          </div>
        </div>

        {/* Apps */}
        <div className='bg-sky-900 flex rounded-md gap-6 py-3 flex-col items-center lg:flex-row lg:justify-evenly'>
          <div className='flex items-center gap-x-3 '>
            <div className='relative w-8 h-8 '>
              <Image src='/icons/mini-logo.png' layout='fill' />
            </div>
            <span className='text-white text-xl'>
              دانلود اپلیکیشن دیجی‌کالا
            </span>
          </div>

          <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-4'>
            <div className='relative w-40 h-12 mb-3 lg:mb-0'>
              <Image src='/icons/app-coffe-bazzar.svg' layout='fill' />
            </div>
            <div className='relative w-40 h-12'>
              <Image src='/icons/app-google-play.svg' layout='fill' />
            </div>
            <div className='relative w-40 h-12 mb-3 lg:mb-0'>
              <Image src='/icons/app-myket.svg' layout='fill' />
            </div>
            <div className='relative w-40 h-12'>
              <Image src='/icons/app-sib.svg' layout='fill' />
            </div>
          </div>
        </div>

        {/* info */}
        <div className=' mx-3 space-y-6 lg:flex lg:justify-between'>
          <div className='space-y-3 lg:max-w-2xl'>
            <h5 className='text-black font-semibold'>
              فروشگاه اینترنتی دیجی‌کالا، بررسی، انتخاب و خرید آنلاین
            </h5>
            <p className='text-gray-700 text-justify'>
              یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی
              متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست
              مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی
              که فروشگاه اینترنتی دیجی‌کالا سال‌هاست بر روی آن‌ها کار کرده و
              توانسته از این طریق مشتریان ثابت خود را داشته باشد.
            </p>
          </div>

          <div className='flex justify-center gap-x-2'>
            <div className='border border-gray-300 w-fit p-2 rounded-md'>
              <div className='relative w-16 h-16 '>
                <Image src='/icons/m-enamad.png' layout='fill' />
              </div>
            </div>

            <div className='border border-gray-300 w-fit p-2 rounded-md'>
              <div className='relative w-16 h-16 '>
                <Image src='/icons/m-kasbokar.png' layout='fill' />
              </div>
            </div>

            <div className='border border-gray-300 w-fit p-2 rounded-md'>
              <div className='relative w-16 h-16 '>
                <Image src='/icons/m-rezi.png' layout='fill' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-gray-600 py-3 flex items-center justify-center gap-x-3 mt-6'>
        <div className='relative h-16 w-16 rounded-full overflow-hidden border-4 border-red-600'>
          <Image src='/developer.jpg' layout='fill' />
        </div>
        <p className='text-white'>
          توسعه داده شده توسط{" "}
          <a href='http://heydari-dev.ir' target='_blank'>
            کمال حیدری
          </a>
        </p>
      </div>
    </footer>
  );
}
