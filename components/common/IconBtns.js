import { Icons } from 'components'

import { useRouter } from 'next/router'

const IconButton = ({ title, icon, ...restPorps }) => {
  return (
    <button type='button' title={title} className='mx-3 my-2' {...restPorps}>
      {icon}
    </button>
  )
}

export const BackIconBtn = (props) => {
  const { back } = useRouter()
  return (
    <IconButton
      title='برگشت'
      icon={
        <Icons.ArrowRight className='icon-button text-gray-500 bg-gray-50' />
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
    icon={<Icons.Delete className='icon-button text-red-500 bg-red-100' />}
    {...props}
  />
)

export const AddIconBtn = (props) => (
  <IconButton
    title='اضافه'
    icon={<Icons.Plus className='icon-button text-green-500 bg-green-100' />}
    {...props}
  />
)
