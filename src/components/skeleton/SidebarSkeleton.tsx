import { Skeleton } from '@/components/ui'

export default function SidebarSkeleton() {
  return (
    <Skeleton count={4}>
      <Skeleton.Items className="flex-center h-10 justify-between px-4">
        <Skeleton.Item animated="background" height="h-6" width="w-40" />
        <Skeleton.Item animated="background" height="h-7" width="w-7" className="rounded-full" />
      </Skeleton.Items>
    </Skeleton>
  )
}
