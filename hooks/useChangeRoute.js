import { useRouter } from 'next/router'

export default function useChangeRoute({ shallow }) {
  let { query, pathname, push } = useRouter()

  const chaneRoute = (newQueris) => {
    let url = pathname + '?'
    if (!newQueris.hasOwnProperty('page')) newQueris.page = 1

    query = { ...query, ...newQueris }

    Object.keys(query).forEach((key) => {
      return (url += `${key}=${query[key]}&`)
    })

    push(url.slice(0, -1), undefined, { shallow })
  }

  return chaneRoute
}
