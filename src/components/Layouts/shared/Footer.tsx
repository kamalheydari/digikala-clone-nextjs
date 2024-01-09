import Image from 'next/image'

import {
  AppCoffeBazzar,
  AppGooglePlay,
  AppMyket,
  AppSib,
  ArrowUp,
  Instagram,
  Linkedin,
  LogoPersian,
  Twitter,
  Youtube,
} from 'icons'

import { ResponsiveImage } from 'components/ui'
import { ServiceList } from 'components/services'

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-gray-200 bg-gray-50 pt-4">
      <div className="mx-auto space-y-8 px-3 lg:max-w-[1700px] ">
        {/* Logo & scroll to top */}
        <div className="flex justify-between">
          <div>
            <LogoPersian className="mb-6 h-10 w-32" />
            <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-5">
              <span>تلفن پشتیبانی ۶۱۹۳۰۰۰۰ - ۰۲۱</span>
              <span className="hidden w-[2px] bg-gray-300 lg:block" />
              <span>۷ روز هفته، ۲۴ ساعته پاسخگوی شما هستیم</span>
            </div>
          </div>
          <div className="min-w-max">
            <button
              type="button"
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center rounded-md border border-gray-300 px-3 py-1"
            >
              <span className="text-sm ">بازگشت به بالا</span>
              <ArrowUp className="h-7 w-7 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <ServiceList />
        </div>

        <div className="space-y-8 lg:flex lg:items-start lg:justify-between">
          {/* socials */}
          <div className="flex items-center justify-between">
            <p className="lg:ml-20">همراه ما باشید!</p>
            <div className="flex gap-x-5">
              <Twitter className="h-8 w-8 text-gray-400" />
              <Linkedin className="h-8 w-8 text-gray-400" />
              <Instagram className="h-8 w-8 text-gray-400" />
              <Youtube className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          {/* Newslatter */}
          <div className="max-w-lg flex-1">
            <form className="flex gap-x-3">
              <input placeholder="ایمیل شما" className="input" type="email" />
              <button type="submit" className="rounded-md bg-gray-200 px-2 text-white ">
                ثبت
              </button>
            </form>
          </div>
        </div>

        {/* Apps */}
        <div className="flex flex-col items-center gap-6 rounded-md bg-sky-900 py-3 lg:flex-row lg:justify-evenly">
          <div className="flex items-center gap-x-3 ">
            <Image src="/icons/mini-logo.png" alt="دیجی‌کالا" width={32} height={32} />
            <span className="text-xl text-white">دانلود اپلیکیشن دیجی‌کالا</span>
          </div>

          <div className="grid grid-cols-2 gap-x-3 sm:grid-cols-4">
            <AppCoffeBazzar className="mb-1 h-12 w-32 sm:w-36 lg:mb-0 lg:w-44" />
            <AppGooglePlay className="mb-1 h-12 w-32 sm:w-36 lg:mb-0 lg:w-44" />
            <AppMyket className="mb-1 h-12 w-32 sm:w-36 lg:mb-0 lg:w-44" />
            <AppSib className="mb-1 h-12 w-32 sm:w-36 lg:mb-0 lg:w-44" />
          </div>
        </div>

        {/* info */}
        <div className="space-y-6 lg:flex lg:justify-between">
          <div className="space-y-3 lg:max-w-2xl">
            <h5 className="font-semibold text-black">فروشگاه اینترنتی دیجی‌کالا، بررسی، انتخاب و خرید آنلاین</h5>
            <p className="text-justify text-gray-700">
              یک خرید اینترنتی مطمئن، نیازمند فروشگاهی است که بتواند کالاهایی متنوع، باکیفیت و دارای قیمت مناسب را در
              مدت زمانی کوتاه به دست مشتریان خود برساند و ضمانت بازگشت کالا هم داشته باشد؛ ویژگی‌هایی که فروشگاه
              اینترنتی دیجی‌کالا سال‌هاست بر روی آن‌ها کار کرده و توانسته از این طریق مشتریان ثابت خود را داشته باشد.
            </p>
          </div>

          <div className="flex justify-center gap-x-2">
            <ResponsiveImage
              className="rounded-md border border-gray-300 p-2"
              dimensions="h-20 w-20"
              src="/icons/m-enamad.png"
              alt="ای نماد"
              imageStyles="object-contain"
            />
            <ResponsiveImage
              className="rounded-md border border-gray-300 p-2"
              dimensions="h-20 w-20"
              src="/icons/m-kasbokar.png"
              alt="کسب و کار"
              imageStyles="object-contain"
            />
            <ResponsiveImage
              className="rounded-md border border-gray-300 p-2"
              dimensions="h-20 w-20"
              src="/icons/m-rezi.png"
              alt="ساماندهی"
              imageStyles="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-3 bg-gray-600 py-3">
        <Image
          src="/imgs/developer.jpg"
          className="overflow-hidden rounded-full border-4 border-red-600"
          alt="کمال حیدری"
          width={64}
          height={64}
        />
        <p className="text-white">
          توسعه داده شده توسط{' '}
          <a href="http://heydari-dev.ir" target="_blank" className="text-sky-400">
            کمال حیدری
          </a>
        </p>
      </div>
    </footer>
  )
}
