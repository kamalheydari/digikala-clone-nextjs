import { useEffect, useState } from 'react'

import '/styles/main.css'
import '/styles/browser-styles.css'
import '/styles/swiper.css'

import { store } from 'store'
import { Provider } from 'react-redux'

import { PageLoading, Alert } from 'components'

import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState<boolean>(false)
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <PageLoading />
      <Alert />
    </Provider>
  )
}
