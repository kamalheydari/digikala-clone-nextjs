import { roles } from 'utils'

import { RequireUser } from 'components/user'
import { UserProfileAside, Header } from 'components/layouts/shared'

interface Props {
  children: React.ReactNode
}

const ProfileLayout: React.FC<Props> = ({ children }) => {
  return (
    <RequireUser allowedRoles={[roles.ADMIN, roles.ROOT, roles.USER]}>
      <Header />
      <div className="lg:container lg:flex lg:max-w-7xl lg:gap-x-4 lg:px-3 xl:mt-28">
        <div className="hidden lg:block">
          <UserProfileAside />
        </div>
        <div className="h-fit flex-1 py-4 lg:mt-6 lg:rounded-md lg:border lg:border-gray-200 lg:py-8">{children}</div>
      </div>
    </RequireUser>
  )
}
export default ProfileLayout
