import { Icons } from 'components'

import { useRouter } from 'next/router'

const IconButton = ({ title, icon, children, ...restPorps }) => {
  return (
    <button type='button' title={title} className='mx-3 my-2' {...restPorps}>
      {icon}
      {children}
    </button>
  )
}

export const BackIconBtn = (props) => {
  const { back } = useRouter()
  return (
    <IconButton
      title='برگشت'
      icon={
        <Icons.ArrowRight className='text-gray-500 icon-button bg-gray-50' />
      }
      onClick={() => back()}
      {...props}
    />
  )
}

export const EditIconBtn = (props) => (
  <IconButton
    title='تغییر'
    icon={<Icons.Edit className='icon-button text-amber-500 bg-amber-100' />}
    {...props}
  />
)

export const DeleteIconBtn = (props) => (
  <IconButton
    title='حذف'
    icon={<Icons.Delete className='text-red-500 bg-red-100 icon-button' />}
    {...props}
  />
)

export const AddIconBtn = (props) => (
  <IconButton
    title='اضافه'
    icon={<Icons.Plus className='text-green-500 bg-green-100 icon-button' />}
    {...props}
  />
)

export const AddToListIconBtn = (props) => (
  <AddIconBtn
    className='border-2 border-green-100 rounded-full flex-center gap-x-4'
    {...props}
  >
    <span className='pl-2 text-base text-green-500'>افزودن به لیست</span>
  </AddIconBtn>
)

export const DeleteFromListIconBtn = (props) => (
  <DeleteIconBtn
    className='border-2 border-red-100 rounded-full flex-center gap-x-4'
    {...props}
  >
    <span className='pl-2 text-base text-red-500'>حذف از لیست</span>
  </DeleteIconBtn>
)
