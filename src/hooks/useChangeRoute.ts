import { useRouter } from 'next/router'
import { generateQueryParams } from '@/utils'

import type { QueryParams } from '@/types'

interface Options {
  shallow?: boolean
}

export default function useChangeRoute(options: Options = { shallow: true }) {
  const { pathname, replace, query } = useRouter()

  const changeRoute = (newQueries: QueryParams): void => {
    const params = generateQueryParams({ ...query, ...newQueries })

    replace(`${pathname}?${params}`, undefined, { ...options })
  }

  return changeRoute
}
