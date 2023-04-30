import { useRouter } from 'next/router'

export default function useChangeRoute(options = { shallow: true }) {
  const { pathname, replace, query } = useRouter()

  const changeRoute = (newQueries) => {
    const queryParams = new URLSearchParams()

    Object.entries({ ...query, ...newQueries }).forEach(([key, value]) => {
      if (value) queryParams.set(key, value)
    })

    replace(`${pathname}?${queryParams.toString()}`, undefined, { ...options })
  }

  return changeRoute
}
