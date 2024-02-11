import { Logo } from '@/icons'
import { InlineLoading } from '@/components/ui/loading'

export default function FullScreenLoading() {
  return (
    <div className="mx-auto max-w-max space-y-10 rounded-lg bg-red-100/90 p-8 text-center ">
      <Logo className="mx-auto h-12 w-40 " />
      <InlineLoading />
    </div>
  )
}
