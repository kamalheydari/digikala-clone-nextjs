import { OrderEmpty } from 'components'

export default function EmptyCommentsList() {
  return (
    <div className='py-20'>
      <OrderEmpty className='mx-auto h-52 w-52' />

      <p className='text-center'>هنوز هیچ نظری ندارید</p>
    </div>
  )
}
