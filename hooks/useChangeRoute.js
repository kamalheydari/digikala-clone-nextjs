import { useRouter } from 'next/router'

export default function useChangeRoute(options = { shallow: true }) {
  let { query, pathname, push } = useRouter()

  const chaneRoute = (newQueris) => {
    if (!newQueris.hasOwnProperty('page')) newQueris.page = 1

    query = { ...query, ...newQueris }

    const queryParams = new URLSearchParams(query)

    push(`${pathname}?${queryParams.toString()}`, undefined, { ...options })
  }

  return chaneRoute
}
