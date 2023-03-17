import { Skeleton } from 'components'

export default function SubCategoriesSkeleton() {
  return (
    <div className='px-4 my-7'>
      <Skeleton.Item
        animated='background'
        height='h-5'
        width='w-24'
        className='mb-4 '
      />
      <div className='flex gap-3 pb-3 overflow-x-auto '>
        <Skeleton count={5}>
          <Skeleton.Items className='p-3 border-4 border-red-200 rounded-md'>
            <Skeleton.Item
              animated='background'
              height='h-24 md:h-28 xl:h-36'
              width='w-24 md:w-28 lg:w-36 xl:w-36'
              className='mb-2 rounded-full'
            />
            <Skeleton.Item
              animated='background'
              height='h-5'
              width='w-20'
              className='mx-auto rounded-md '
            />
          </Skeleton.Items>
        </Skeleton>
      </div>
    </div>
  )
}
