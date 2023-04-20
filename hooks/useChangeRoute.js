import { useRouter } from 'next/router'

export default function useChangeRoute(options = { shallow: true }) {
  const { pathname, push,replace } = useRouter()

  const changeRoute = (newQueries) => {
    const {
      category,
      page_size,
      page,
      sort,
      search,
      inStock,
      discount,
      price,
    } = newQueries

    const queryParams = new URLSearchParams()

    Object.entries({
      category,
      page_size,
      page,
      sort,
      search,
      inStock,
      discount,
      price,
    }).forEach(([key, value]) => {
      if (value) queryParams.set(key, value)
    })

    replace(`${pathname}?${queryParams.toString()}`, undefined, { ...options })
  }

  return changeRoute
}
