import { Skeleton } from '@/components/ui'

export default function SubCategoriesSkeleton() {
  return (
    <>
      <Skeleton.Item animated="background" height="h-5" width="w-24" className="mb-4 " />
      <div className="flex gap-3 overflow-x-auto pb-3 ">
        <Skeleton count={5}>
          <Skeleton.Items className="rounded-md border-4 border-red-200 p-3">
            <Skeleton.Item
              animated="background"
              height="h-24 md:h-32 xl:h-40"
              width="w-24 md:w-32  xl:w-40"
              className="mb-2 rounded-2xl"
            />
            <Skeleton.Item animated="background" height="h-5" width="w-20" className="mx-auto rounded-md " />
          </Skeleton.Items>
        </Skeleton>
      </div>
    </>
  )
}
