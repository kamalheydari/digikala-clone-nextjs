import { Logo } from 'components'
import Loading from 'components/common/Loading'

export default function BigLoading() {
  return (
    <div className='p-8 mx-auto text-center space-y-10 rounded-lg bg-red-100/90 max-w-max '>
      <Logo className=' w-40 h-12 mx-auto' />
      <Loading />
    </div>
  )
}
