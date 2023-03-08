import { useRouter } from 'next/router'

import { Header, ProfileAside } from 'components'

import useVerify from 'hooks/useVerify'

export default function ProfileLayout({ children }) {
  const isVerify = useVerify(false)
  const router = useRouter()

  if (!isVerify) router.push('/')
  else
    return (
      <>
        <Header />
        <div className='profile-layout'>
          <div className='profile-layout__aside hidden lg:block'>
            <ProfileAside />
          </div>
          <div className='profile-layout__content'>{children}</div>
        </div>
      </>
    )
}
