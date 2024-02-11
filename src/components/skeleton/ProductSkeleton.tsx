import { Skeleton } from '@/components/ui'

export default function ProductSkeleton() {
  return (
    <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <Skeleton count={10}>
        <Skeleton.Items className="flex items-center gap-4 border-b border-gray-100 pb-3 pt-2 sm:h-[540px] sm:flex-col sm:px-3 xl:h-[470px]">
          <Skeleton.Item
            height="h-[216px]"
            width="w-[26vw] sm:w-56"
            animated="background"
            className="rounded-md sm:mb-8"
          />
          <div className="flex-1 space-y-5 sm:w-full">
            <Skeleton.Item height="h-5" width="w-64" animated="background" />
            <Skeleton.Item height="h-5" width="w-60" animated="background" className="mb-auto" />
            <Skeleton.Item height="h-5" width="w-28" animated="background" />
            <div className="flex justify-between">
              <Skeleton.Item height="h-5" width="w-20" animated="background" />
              <Skeleton.Item height="h-5" width="w-20" animated="background" />
            </div>
          </div>
        </Skeleton.Items>
      </Skeleton>
    </div>
  )
}
