import { useRouter } from 'next/router'

interface Options {
  shallow?: boolean
}

export  interface NewQueries {
  [key: string]: string | number | boolean
}

export type ChangeRouteFunc = (newQueries: NewQueries) => void

export default function useChangeRoute(options: Options = { shallow: true }) {
  const { pathname, replace, query } = useRouter()

  const changeRoute: ChangeRouteFunc = (newQueries) => {
    const queryParams = new URLSearchParams()

    Object.entries({ ...query, ...newQueries }).forEach(([key, value]) => {
      if (value) queryParams.set(key, value.toString())
    })

    replace(`${pathname}?${queryParams.toString()}`, undefined, { ...options })
  }

  return changeRoute
}
