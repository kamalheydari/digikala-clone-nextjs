import { Header, ProfileAside, RequireUser } from 'components'

import { roles } from 'utils'

interface Props {
  children: React.ReactNode
}

const ProfileLayout: React.FC<Props> = ({ children }) => {
  return (
    <RequireUser allowedRoles={[roles.ADMIN, roles.ROOT, roles.USER]}>
      <Header />
      <div className="lg:container lg:flex lg:max-w-7xl lg:gap-x-4 lg:px-3 xl:mt-28">
        <div className="hidden lg:block">
          <ProfileAside />
        </div>
        <div className="h-fit flex-1 py-4 lg:mt-6 lg:rounded-md lg:border lg:border-gray-300 lg:py-8">{children}</div>
      </div>
    </RequireUser>
  )
}
export default ProfileLayout
