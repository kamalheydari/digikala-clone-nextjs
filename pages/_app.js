import { useEffect, useState } from 'react'

import '/styles/main.css'
import '/styles/browser-styles.css'
import '/styles/swiper.css'

//? Store
import { store } from 'store'
import { Provider } from 'react-redux'

//? Components
import { PageLoading, Alert } from 'components'

export default function MyApp({ Component, pageProps }) {
  //? Fix Hydration failed
  const [showChild, setShowChild] = useState(false)
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
