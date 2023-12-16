import { useState } from 'react'

import { useLogoutQuery, userApiSlice } from 'services'

import { Button, HandleResponse } from 'components'
import { Logout as LogoutIcon } from 'icons'

import { useAppDispatch } from 'hooks'

export default function Logout() {
  const [skip, setSkip] = useState(true)

  const dispatch = useAppDispatch()

  // ? Logout Query
  const { data, isError, isLoading, error, isSuccess } = useLogoutQuery(undefined, {
    skip,
  })

  // ? Handlers
  const handleLogout = () => {
    setSkip(false)
  }
  const onSuccess = () => {
    dispatch(userApiSlice.util.invalidateTags(['User']))
  }

  // ? Render(s)
  return (
    <>
      {/* Handle Delete Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.msg}
          onSuccess={onSuccess}
        />
      )}

      <Button
        className="flex w-full cursor-pointer justify-between gap-x-2 bg-gray-300/70 px-7 py-4 text-xs text-gray-800 transition-colors md:text-sm"
        onClick={handleLogout}
        isLoading={isLoading}
      >
        <LogoutIcon className="icon text-black" />
        <span className="ml-auto mr-3 text-gray-800">خروج از حساب کاربری</span>
      </Button>
    </>
  )
}
