import Image from 'next/image'
import { useState, useEffect } from 'react'

import { useGetOrdersQuery } from 'services'

import { formatNumber } from 'utils'

import { Skeleton, ArrowLink } from 'components/ui'

export default function Orders() {
  // ? States
  const [pendingOrder, setPendingOrder] = useState(0)
  const [successOrder, setSuccessOrder] = useState(0)

  // ? Get Order Query
  const { data, isLoading } = useGetOrdersQuery({ page: 1, pageSize: 100 })

  // ? Handle Get Order Response
  useEffect(() => {
    if (data) {
      const pending = data?.orders.filter((item) => item.delivered === false)
      const success = data?.orders.filter((item) => item.delivered === true)

      setPendingOrder(pending.length)
      setSuccessOrder(success.length)
    }
  }, [data])

  // ? Local Components
  const StatusSkeleton = () => (
    <Skeleton.Item animated="background" height=" h-16 lg:h-14" width="w-12 lg:w-28" className="rounded-sm" />
  )

  // ? Render(s)
  return (
    <section>
      <div className="py-6 lg:py-0">
        <div className="mb-7 flex justify-between px-5">
          <h4 className="inline-block border-b-2 border-red-500 py-1 text-sm md:text-base">سفارش‌های من</h4>
          <ArrowLink path="profile/orders">مشاهده همه</ArrowLink>
        </div>
        <div className="flex justify-evenly lg:py-20">
          {isLoading ? (
            <StatusSkeleton />
          ) : (
            <div className="flex flex-col items-center lg:flex-row lg:gap-x-2">
              <div className="relative h-12 w-12 lg:h-14 lg:w-14">
                <Image src="/icons/status-processing.svg" fill alt="جاری" />
                <span className="farsi-digits order-badge absolute">{formatNumber(pendingOrder)}</span>
              </div>
              <div className="text-gray-700">
                <span className="farsi-digits hidden lg:block lg:text-black">{formatNumber(pendingOrder)} سفارش</span>
                <span className="text-xs lg:text-sm">جاری</span>
              </div>
            </div>
          )}

          <div className="section-divide-x" />

          {isLoading ? (
            <StatusSkeleton />
          ) : (
            <div className="flex flex-col items-center lg:flex-row lg:gap-x-2">
              <div className="relative h-12 w-12 lg:h-14 lg:w-14">
                <Image src="/icons/status-delivered.svg" fill alt="تحویل شده" />
                <span className="farsi-digits order-badge absolute">{formatNumber(successOrder)}</span>
              </div>
              <div className="text-gray-700">
                <span className="farsi-digits hidden lg:block lg:text-black">{formatNumber(successOrder)} سفارش</span>
                <span className="text-xs lg:text-sm">تحویل شده</span>
              </div>
            </div>
          )}

          <div className="section-divide-x" />

          {isLoading ? (
            <StatusSkeleton />
          ) : (
            <div className="flex flex-col items-center lg:flex-row lg:gap-x-2">
              <div className="relative h-12 w-12 lg:h-14 lg:w-14">
                <Image src="/icons/status-returned.svg" fill alt="مرجوع" />
                <span className="order-badge farsi-digits absolute">0</span>
              </div>
              <div className="text-gray-700">
                <span className="farsi-digits hidden lg:block lg:text-black">0 سفارش</span>
                <span className="text-xs lg:text-sm">مرجوع</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="section-divide-y" />
    </section>
  )
}
