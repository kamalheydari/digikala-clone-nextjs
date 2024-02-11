import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import '../styles/main.css'
import '../styles/browser-styles.css'
import '../styles/swiper.css'

import { store } from '@/store'
import { Provider } from 'react-redux'
import { userApiSlice } from '@/services'

import { tokens } from '@/utils'

import { PageTransitionLoading } from '@/components/ui/loading'
import { Alert } from '@/components/ui'

import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter()

  // Fix Hydration
  const [showChild, setShowChild] = useState<boolean>(false)
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  // ? Get user in initial
  const loggedInCookie = Cookies.get(tokens.LOGGED_IN)
  if (loggedInCookie) store.dispatch(userApiSlice.endpoints.getUserInfo.initiate())

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      {!asPath.includes('/products?category') ? <PageTransitionLoading /> : null}
      <Alert />
    </Provider>
  )
}
