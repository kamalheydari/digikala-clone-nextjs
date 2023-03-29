import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from 'store'

import { verifyToken } from 'utils'

import RedirectToLogin from './modals/RedirectToLogin'
import { useDisclosure } from 'hooks'

export default function ValidationToken() {
  const [isShowRedirectModal, redirectModalHandlers] = useDisclosure()

  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.user)

  //? handle exp token
  const isverify = verifyToken(token)

  if (!isverify && token) {
    dispatch(userLogout())
    redirectModalHandlers.open()

    return (
      <RedirectToLogin
        title=''
        text='توکن احراز هویت نادرست است یا منقضی شده است'
        onClose={redirectModalHandlers.close}
        isShow={isShowRedirectModal}
      />
    )
  }

  return null
}
