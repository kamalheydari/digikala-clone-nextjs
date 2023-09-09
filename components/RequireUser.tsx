import { useRouter } from 'next/router'

import { useUserInfo } from 'hooks'

import Cookies from 'js-cookie'
import { tokens } from 'utils'

interface Props {
  children: React.ReactNode
  allowedRoles: string[]
}

const RequireUser: React.FC<Props> = (props) => {
  //? Props
  const { allowedRoles, children } = props

  //? Assets
  const { push, asPath } = useRouter()
  const loggedInCookie = Cookies.get(tokens.LOGGED_IN)

  //? Get UserInfo
  const { userInfo } = useUserInfo()

  if (loggedInCookie || userInfo) {
    if (allowedRoles?.includes(userInfo?.role as string)) {
      return children
    }
  } else {
    asPath.includes('/admin')
      ? push(`/admin/authentication/login?redirectTo=${asPath}`)
      : push(`/authentication/login?redirectTo=${asPath}`)

    return null
  }
}

export default RequireUser
