import { FreeShippingSvg } from 'icons'

export default function FreeShipping() {
  return (
    <div className="bg-gray-100 px-7 py-5 lg:bg-transparent lg:px-0 ">
      <div className="flex justify-between rounded-lg border border-gray-300 bg-white">
        <div className="p-3">
          <h4>ارسال رایگان</h4>
          <p className="mt-2 text-xs text-gray-500 lg:text-sm">برای سفارش‌ بالای ۵۰۰ هزار تومان</p>
        </div>
        <FreeShippingSvg className="h-20 w-32 px-4" />
      </div>
    </div>
  )
}
