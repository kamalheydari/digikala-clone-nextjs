import { FreeShippingSvg } from 'components'

export default function FreeShipping() {
  return (
    <div className='py-5 bg-gray-100 px-7 lg:bg-transparent lg:px-0 '>
      <div className='flex justify-between bg-white border border-gray-300 rounded-lg'>
        <div className='p-3'>
          <h4>ارسال رایگان</h4>
          <p className='mt-2 text-xs text-gray-500 lg:text-sm'>
            برای سفارش‌ بالای ۵۰۰ هزار تومان
          </p>
        </div>
        <FreeShippingSvg className='w-32 h-20 px-4' />
      </div>
    </div>
  )
}
