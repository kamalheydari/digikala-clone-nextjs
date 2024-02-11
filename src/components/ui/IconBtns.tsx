import { useRouter } from 'next/router'

import { ArrowRight, Delete, Edit, Plus } from '@/icons'

interface IconButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface IconButtonProps extends IconButtonType {
  title: string
  icon: React.ReactNode
}

const IconButton: React.FC<IconButtonProps> = (props) => {
  // ? Props
  const { title, icon, children, ...restPorps } = props

  // ? Render(s)
  return (
    <button type="button" title={title} className="mx-3 my-2" {...restPorps}>
      {icon}
      {children}
    </button>
  )
}

export const BackIconButton: React.FC<IconButtonType> = (props) => {
  // ? Assets
  const { back } = useRouter()

  // ? Render(s)
  return (
    <IconButton
      title="برگشت"
      icon={
        <ArrowRight className="h-8 w-8 rounded-2xl bg-gray-50 p-1 text-gray-500 active:scale-95 lg:h-9 lg:w-9 lg:p-1.5" />
      }
      onClick={() => back()}
      {...props}
    />
  )
}

export const EditIconButton: React.FC<IconButtonType> = (props) => (
  <IconButton
    title="تغییر"
    icon={
      <Edit className="h-8 w-8 rounded-2xl bg-amber-100 p-1 text-amber-500 active:scale-95 lg:h-9 lg:w-9 lg:p-1.5" />
    }
    {...props}
  />
)

export const DeleteIconButton: React.FC<IconButtonType> = (props) => (
  <IconButton
    title="حذف"
    icon={<Delete className="h-8 w-8 rounded-2xl bg-red-100 p-1 text-red-500 active:scale-95 lg:h-9 lg:w-9 lg:p-1.5" />}
    {...props}
  />
)

export const AddIconButton: React.FC<IconButtonType> = (props) => (
  <IconButton
    title="اضافه"
    icon={
      <Plus className="h-8 w-8 rounded-2xl bg-green-100 p-1 text-green-500 active:scale-95 lg:h-9 lg:w-9 lg:p-1.5" />
    }
    {...props}
  />
)

export const AddToListIconButton: React.FC<IconButtonType> = (props) => (
  <AddIconButton className="flex-center gap-x-4 rounded-full border-2 border-green-100" {...props}>
    <span className="pl-2 text-base text-green-500">افزودن به لیست</span>
  </AddIconButton>
)

export const DeleteFromListIconButton: React.FC<IconButtonType> = (props) => (
  <DeleteIconButton className="flex-center gap-x-4 rounded-full border-2 border-red-100" {...props}>
    <span className="pl-2 text-base text-red-500">حذف از لیست</span>
  </DeleteIconButton>
)
