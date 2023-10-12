import { Users } from 'icons'

export default function EmptyUsersList() {
  return (
    <div className='py-20'>
      <Users className='w-10 h-10 text-red-400' />
      <p className='text-center'>هنوز هیچ کاربری ندارید</p>
    </div>
  )
}
