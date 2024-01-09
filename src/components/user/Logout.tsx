import { useState } from 'react'

import { useLogoutQuery, userApiSlice } from 'services'

import { useAppDispatch } from 'hooks'

import { Logout as LogoutIcon } from 'icons'
import { HandleResponse } from 'components/shared'
import { Button } from 'components/ui'

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
        className="flex w-full cursor-pointer justify-between gap-x-2 bg-gray-50 px-7 py-4 text-xs text-gray-700 transition-colors hover:bg-gray-100 md:text-sm"
        onClick={handleLogout}
        isLoading={isLoading}
      >
        <LogoutIcon className="icon text-black" />
        <span className="ml-auto mr-3 text-gray-700">خروج از حساب کاربری</span>
      </Button>
    </>
  )
}
