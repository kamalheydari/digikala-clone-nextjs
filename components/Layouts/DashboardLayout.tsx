import { DashboardAside, RequireUser } from 'components'
import { roles } from 'utils'

interface Props {
  children: React.ReactNode
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  return (
    <RequireUser allowedRoles={[roles.ADMIN, roles.ROOT]}>
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-8xl'>
        <div className='hidden lg:block'>
          <DashboardAside />
        </div>
        <div className='flex-1 lg:py-8 lg:border lg:border-gray-200 lg:rounded-md lg:mt-6 h-fit'>
          {children}
        </div>
      </div>
    </RequireUser>
  )
}

export default DashboardLayout
