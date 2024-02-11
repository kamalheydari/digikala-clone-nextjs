import { Users } from '@/icons'

export default function EmptyUsersList() {
  return (
    <div className="py-20">
      <Users className="h-10 w-10 text-red-400" />
      <p className="text-center">هنوز هیچ کاربری ندارید</p>
    </div>
  )
}
