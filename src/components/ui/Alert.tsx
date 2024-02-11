import { useEffect } from 'react'
import Image from 'next/image'

import { removeAlert } from '@/store'

import { useAppDispatch, useAppSelector } from '@/hooks'

export default function Alert() {
  // ? Store
  const { isShow, status, title } = useAppSelector((state) => state.alert)

  // ? Assets
  const dispatch = useAppDispatch()
  let IconSrc
  switch (status) {
    case 'error':
      IconSrc = '/icons/error.svg'
      break
    case 'success':
      IconSrc = '/icons/success.svg'
      break
    case 'exclamation':
      IconSrc = '/icons/exclamation.svg'
      break
    case 'question':
      IconSrc = '/icons/question.svg'
      break
    default:
      IconSrc = '/icons/nothing.svg'
      break
  }

  // ? Re-Renders
  useEffect(() => {
    if (isShow) {
      const timeout = setTimeout(() => {
        dispatch(removeAlert())
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [isShow])

  // ? Render(s)
  return (
    <div
      className={`${
        isShow ? 'visible opacity-100' : 'invisible opacity-0 '
      } fixed inset-0 z-40 transition-all duration-500`}
    >
      <div className="h-full w-full bg-gray-400/20" onClick={() => dispatch(removeAlert())} />
      <div
        className={`${
          isShow ? 'top-40' : '-top-full'
        } fixed inset-x-0 z-40 mx-auto max-w-md transition-all duration-700`}
      >
        <div className="mx-2 h-fit rounded-md bg-white p-3 text-center shadow">
          <Image className="mx-auto" src={IconSrc} width="80" height="80" alt={status} />
          <p className="mt-2">{title}</p>
        </div>
      </div>
    </div>
  )
}
