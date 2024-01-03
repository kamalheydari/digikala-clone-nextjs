import { DashboardAside, RequireUser } from 'components'
import { roles } from 'utils'

interface Props {
  children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <RequireUser allowedRoles={[roles.ADMIN, roles.ROOT]}>
      <div className="lg:container lg:flex lg:max-w-7xl lg:gap-x-4 lg:px-3">
        <div className="hidden lg:block">
          <DashboardAside />
        </div>
        <div className="h-fit flex-1 lg:mt-6 lg:rounded-md lg:border lg:border-gray-200 lg:py-8">{children}</div>
      </div>
    </RequireUser>
  )
}

export default DashboardLayout
