import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { userLogout, showAlert } from 'store'

import { Icons } from 'components'

export default function Logout() {
  const dispatch = useDispatch()
  const router = useRouter()

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

  return (
    <button type='button' className='logout' onClick={() => handleLogout()}>
      <Icons.Logout className='text-black icon' />
      <span>خروج از حساب کاربری</span>
    </button>
  )
}
