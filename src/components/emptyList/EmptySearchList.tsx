import Image from 'next/image'

import { EmptySearch } from '@/icons'

export default function EmptySearchList() {
  return (
    <div className="py-20">
      <EmptySearch className="mx-auto h-60 w-60" />
      <div className="mx-auto max-w-md space-y-2 rounded-md border p-2">
        <div className="flex items-center gap-x-2">
          <Image src="/icons/exclamation.svg" alt="exclamation" width={32} height={32} />
          <h5>نتیجه‌ای یافت نشد!</h5>
        </div>
        <p className="text-gray-500">از عبارت‌های متداول‌تر استفاده کنید و یا املای عبارت وارد‌شده را بررسی کنید.</p>
      </div>
    </div>
  )
}
