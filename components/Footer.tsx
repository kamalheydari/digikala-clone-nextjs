import Image from 'next/image'

import {
  AppCoffeBazzar,
  AppGooglePlay,
  AppMyket,
  AppSib,
  Icons,
  LogoPersian,
  ResponsiveImage,
  Services,
} from 'components'

import Enamad from '../public/icons/m-enamad.png'
import Kasbokar from '../public/icons/m-kasbokar.png'
import Samandehi from '../public/icons/m-rezi.png'

export default function Footer() {
  return (
    <footer className='pt-4 mt-8 border-t border-gray-200 bg-gray-50'>
      <div className='px-3 lg:max-w-[1700px] space-y-8 mx-auto '>
        {/* Logo & scroll to top */}
        <div className='flex justify-between'>
          <div>
            <LogoPersian className='w-32 h-10 mb-6' />
            <div className='flex flex-col gap-y-2 lg:flex-row lg:gap-x-5'>
              <span>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</span>
              <span className='hidden lg:block bg-gray-300 w-[2px]' />
              <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
            </div>
          </div>
          <div className='min-w-max'>
            <button
              type='button'
              onClick={() => window.scrollTo(0, 0)}
              className='flex items-center px-3 py-1 border border-gray-300 rounded-md'
            >
              <span className='text-sm '>بازگشت به بالا</span>
              <Icons.ArrowUp className='text-gray-400 h-7 w-7' />
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
            <div className='flex gap-x-5'>
              <Icons.Twitter className='w-8 h-8 text-gray-400' />
              <Icons.Linkedin className='w-8 h-8 text-gray-400' />
              <Icons.Instagram className='w-8 h-8 text-gray-400' />
              <Icons.Youtube className='w-8 h-8 text-gray-400' />
            </div>
          </div>

          {/* Newslatter */}
          <div className='flex-1 max-w-lg'>
            <form className='flex gap-x-3'>
              <input placeholder='ایمیل شما' className='input' type='email' />
              <button
                type='submit'
                className='px-2 text-white bg-gray-200 rounded-md '
              >
                ثبت
              </button>
            </form>
          </div>
        </div>

        {/* Apps */}
        <div className='flex flex-col items-center gap-6 py-3 rounded-md bg-sky-900 lg:flex-row lg:justify-evenly'>
          <div className='flex items-center gap-x-3 '>
            <Image
              src='/icons/mini-logo.png'
              alt='دیجی‌کالا'
              width={32}
              height={32}
            />
            <span className='text-xl text-white'>
              دانلود اپلیکیشن دیجی‌کالا
            </span>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-x-3'>
            <AppCoffeBazzar className='w-32 h-12 mb-1  sm:w-36 lg:w-44 lg:mb-0' />
            <AppGooglePlay className='w-32 h-12 mb-1  sm:w-36 lg:w-44 lg:mb-0' />
            <AppMyket className='w-32 h-12 mb-1  sm:w-36 lg:w-44 lg:mb-0' />
            <AppSib className='w-32 h-12 mb-1  sm:w-36 lg:w-44 lg:mb-0' />
          </div>
        </div>

        {/* info */}
        <div className='space-y-6 lg:flex lg:justify-between'>
          <div className='space-y-3 lg:max-w-2xl'>
            <h5 className='font-semibold text-black'>
              فروشگاه اینترنتی دیجی‌کالا، بررسی، انتخاب و خرید آنلاین
            </h5>
            <p className='text-justify text-gray-700'>
              یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی
              متنوع، باکیفیت و دارای قیمت مناسب را در مدت زمانی کوتاه به دست
              مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی
              که فروشگاه اینترنتی دیجی‌کالا سال‌هاست بر روی آن‌ها کار کرده و
              توانسته از این طریق مشتریان ثابت خود را داشته باشد.
            </p>
          </div>

          <div className='flex justify-center gap-x-2'>
            <ResponsiveImage
              className='p-2 border border-gray-300 rounded-md'
              dimensions='h-20 w-20'
              src={Enamad}
              alt='ای نماد'
            />
            <ResponsiveImage
              className='p-2 border border-gray-300 rounded-md'
              dimensions='h-20 w-20'
              src={Kasbokar}
              alt='کسب و کار'
            />
            <ResponsiveImage
              className='p-2 border border-gray-300 rounded-md'
              dimensions='h-20 w-20'
              src={Samandehi}
              alt='ساماندهی'
            />
            {/* <div className='relative h-20 w-20'>
              <Image src={Samandehi} fill />
            </div> */}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center py-3 mt-6 bg-gray-600 gap-x-3'>
        <Image
          src='/developer.jpg'
          className='overflow-hidden border-4 border-red-600 rounded-full'
          alt='کمال حیدری'
          width={64}
          height={64}
        />
        <p className='text-white'>
          توسعه داده شده توسط{' '}
          <a
            href='http://heydari-dev.ir'
            target='_blank'
            className='text-sky-400'
          >
            کمال حیدری
          </a>
        </p>
      </div>
    </footer>
  )
}
