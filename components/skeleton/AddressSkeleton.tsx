import { Skeleton } from 'components'
import { Phone, Post, User, UserLocation } from 'icons'

const AddressSkeleton = () => {
  return (
    <section className='flex-1 px-5 '>
      <div className='flex justify-between py-4 border-b border-gray-200'>
        <Skeleton.Item animated='background' height='h-5' width='w-52' />
      </div>
      <div className='my-2 space-y-3 text-gray-500'>
        <div className='flex items-center gap-x-2 '>
          <UserLocation className='text-gray-500 icon' />
          <Skeleton.Item animated='background' height='h-5' width='w-40' />
        </div>
        <div className='flex items-center gap-x-2 '>
          <Post className='text-gray-500 icon' />
          <Skeleton.Item animated='background' height='h-5' width='w-40' />
        </div>
        <div className='flex items-center gap-x-2 '>
          <Phone className='text-gray-500 icon' />
          <Skeleton.Item animated='background' height='h-5' width='w-40' />
        </div>

        <div className='flex items-center gap-x-2 '>
          <User className='text-gray-500 icon' />
          <Skeleton.Item animated='background' height='h-5' width='w-40' />
        </div>
      </div>
    </section>
  )
}
export default AddressSkeleton
