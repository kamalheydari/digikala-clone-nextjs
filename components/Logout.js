import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { userLogout, showAlert } from 'store'

import { Icons } from 'components'

export default function Logout() {
  //? Assets
  const dispatch = useDispatch()
  const router = useRouter()

  //? Handlers
  const handleLogout = () => {
    router.push('/')
    dispatch(userLogout())
    dispatch(
      showAlert({
        status: 'success',
        title: 'خروج موفقیت آمیز بود',
      })
    )
  }

  //? Render(s)
  return (
    <button
      type='button'
      className='flex justify-between px-7 transition-colors hover:bg-gray-100 py-4  text-xs text-gray-700 w-full border-t border-gray-300 cursor-pointer gap-x-2 md:text-sm'
      onClick={handleLogout}
    >
      <Icons.Logout className='text-black icon' />
      <span className='ml-auto mr-3 text-gray-700'>خروج از حساب کاربری</span>
    </button>
  )
}
