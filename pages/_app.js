import { useEffect, useState } from 'react'

import '/styles/main.css'
import '/styles/browser-styles.css'
import '/styles/swiper.css'

//? Store
import { store } from 'app/store'
import { Provider } from 'react-redux'

//? Layouts & Components
import {
  DashboardLayout,
  ClientLayout,
  ProfileLayout,
  ValidationToken,
  PageLoading,
  Alert,
} from 'components'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  //? Fix Hydration failed
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  const router = useRouter()

  //? Lyout Config
  if (Component.getClientLayout) {
    return Component.getClientLayout(
      <Provider store={store}>
        <ClientLayout>
          <PageLoading />
          <Component key={router.asPath} {...pageProps} />
          <ValidationToken />
          <Alert />
        </ClientLayout>
      </Provider>
    )
  }

  //? Lyout Config
  if (Component.getDashboardLayout) {
    return Component.getDashboardLayout(
      <Provider store={store}>
        <DashboardLayout>
          <PageLoading />
          <Component key={router.asPath} {...pageProps} />
          <ValidationToken />
          <Alert />
        </DashboardLayout>
      </Provider>
    )
  }
  //? Lyout Config
  if (Component.getProfileLayout) {
    return Component.getProfileLayout(
      <Provider store={store}>
        <ProfileLayout>
          <PageLoading />
          <Component key={router.asPath} {...pageProps} />
          <ValidationToken />

          <Alert />
        </ProfileLayout>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <PageLoading />
      <Component key={router.asPath} {...pageProps} />
      <Alert />
    </Provider>
  )
}
