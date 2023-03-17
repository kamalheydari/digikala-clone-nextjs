import { Skeleton } from 'components'

export default function CategoriesSkeleton() {
  return (
    <div className='px-3 '>
      <Skeleton.Item
        animated='background'
        height='h-4'
        width='w-72'
        className='mx-auto mb-3 rounded-full'
      />
      <div className='flex flex-wrap justify-center gap-4 mx-auto space-x-4 w-fit'>
        <Skeleton count={3}>
          <Skeleton.Items className='flex flex-col items-center gap-y-3'>
            <Skeleton.Item
              animated='background'
              height='h-32'
              width='w-32'
              className='rounded-full'
            />
            <Skeleton.Item
              animated='background'
              height='h-5'
              width='w-40'
              className='rounded-md'
            />
          </Skeleton.Items>
        </Skeleton>
      </div>
    </div>
  )
}
