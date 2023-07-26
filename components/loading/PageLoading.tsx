import Router from 'next/router'
import { useEffect, useState } from 'react'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { BigLoading } from 'components'

NProgress.configure({ showSpinner: false })

export default function PageLoading() {
  //? States
  const [loading, setLoading] = useState(false)

  //? Re-Renders
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setLoading(true)
      NProgress.start()
    })
    Router.events.on('routeChangeComplete', () => {
      setLoading(false)
      NProgress.done()
      NProgress.remove()
    })
  })

  //? Render(s)
  return (
    loading && (
      <div className='fixed inset-0 z-40 '>
        <div className='grid h-full bg-blue-50/30 place-items-center '>
          <BigLoading />
        </div>
      </div>
    )
  )
}
