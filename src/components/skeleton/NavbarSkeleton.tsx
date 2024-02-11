import { Skeleton } from '@/components/ui'

export default function NavbarSkeleton() {
  return (
    <Skeleton count={4}>
      <Skeleton.Items className="flex-center h-16 justify-between px-4">
        <Skeleton.Item height="h-7" width="w-7" animated="background" className="rounded-full" />
        <Skeleton.Item height="h-5" width="w-32" animated="background" />
      </Skeleton.Items>
    </Skeleton>
  )
}
