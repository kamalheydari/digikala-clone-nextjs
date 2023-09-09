import { Header, ProfileAside, RequireUser } from 'components'

import { roles } from 'utils'

interface Props {
  children: React.ReactNode
}

const ProfileLayout: React.FC<Props> = ({ children }) => {
  return (
    <RequireUser allowedRoles={[roles.ADMIN, roles.ROOT, roles.USER]}>
      <Header />
      <div className='lg:flex lg:gap-x-4 lg:px-3 lg:container lg:max-w-7xl xl:mt-28'>
        <div className='hidden lg:block'>
          <ProfileAside />
        </div>
        <div className='flex-1 py-4 lg:py-8 lg:border lg:border-gray-200 lg:rounded-md lg:mt-6 h-fit'>
          {children}
        </div>
      </div>
    </RequireUser>
  )
}
export default ProfileLayout
