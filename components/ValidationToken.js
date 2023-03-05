import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from 'app/slices/user.slice'

import verifyToken from 'utils/verifyToken'

import RedirectToLogin from './modals/RedirectToLogin'
import useDisclosure from 'hooks/useDisclosure'

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
