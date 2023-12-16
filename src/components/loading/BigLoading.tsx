import { Loading } from 'components'
import { Logo } from 'icons'

export default function BigLoading() {
  return (
    <div className="mx-auto max-w-max space-y-10 rounded-lg bg-red-200 p-8 text-center ">
      <Logo className="mx-auto h-12 w-40 " />
      <Loading />
    </div>
  )
}
