import { DashboardAside } from 'components'
import { useRouter } from 'next/router'

import useUserInfo from 'hooks/useUserInfo'

export default function DashboardLayout({ children }) {
  const router = useRouter()

  const { userInfo, isVerify } = useUserInfo()

  if (!isVerify || userInfo?.role === 'user') router.push('/admin/login')

  if (userInfo?.role === 'admin' || userInfo?.root)
    return (
      <div className='dashboard-layout'>
        <div className='dashboard-layout__aside'>
          <DashboardAside user={userInfo} />
        </div>
        <div className='dashboard-layout__content'>{children}</div>
      </div>
    )
}
