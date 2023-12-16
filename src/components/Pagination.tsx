import { useRouter } from 'next/router'

import { ArrowLeft, ArrowRight2 } from 'icons'

import { useMediaQuery, useChangeRoute } from 'hooks'

import type { IPagination, QueryParams } from 'types'

interface Props {
  pagination: IPagination
  section: string
  client?: boolean
}

const Pagination: React.FC<Props> = (props) => {
  // ? Props
  const { pagination, section, client } = props
  const { currentPage, nextPage, previousPage, hasNextPage, hasPreviousPage, lastPage } = pagination

  // ? Assets
  const isDesktop = useMediaQuery('(min-width:1024px)')
  const changeRoute = useChangeRoute()
  const { query } = useRouter()

  // ? Handlers
  const scrollToTop = () => {
    const element = document.getElementById(section)!

    const scrollY = client && isDesktop ? element?.offsetTop - 115 : element?.offsetTop

    window.scrollTo(0, scrollY)
  }

  const handleChangePage = (pageQuery: QueryParams) => {
    changeRoute({
      ...query,
      ...pageQuery,
    })
  }

  // ? Render(s)
  return (
    <nav>
      <ul className="farsi-digits inline-flex w-full items-center gap-x-2 px-10">
        <div className="ml-auto">
          {hasPreviousPage && (
            <li
              className="flex cursor-pointer items-center p-1 text-red-600"
              onClick={() => {
                handleChangePage({ page: previousPage })
                scrollToTop()
              }}
            >
              <ArrowRight2 className="icon text-red-600" />
              قبلی
            </li>
          )}
        </div>
        {currentPage !== 1 && previousPage !== 1 && (
          <li
            className="h-8 w-8 cursor-pointer rounded-2xl border-2 border-transparent p-1 text-center transition-colors hover:border-red-600 hover:text-red-600"
            onClick={() => {
              handleChangePage({ page: 1 })
              scrollToTop()
            }}
          >
            1
          </li>
        )}
        {hasPreviousPage && previousPage !== 1 && <li>...</li>}

        {hasPreviousPage && (
          <li
            className="h-8 w-8 cursor-pointer rounded-2xl border-2 border-transparent p-1 text-center transition-colors hover:border-red-600 hover:text-red-600"
            onClick={() => {
              handleChangePage({ page: previousPage })
              scrollToTop()
            }}
          >
            {previousPage}
          </li>
        )}
        <li
          className="h-8 w-8 cursor-pointer rounded-2xl bg-red-600 p-1.5 text-center text-white"
          onClick={() => {
            handleChangePage({ page: currentPage })
            scrollToTop()
          }}
        >
          {currentPage}
        </li>
        {hasNextPage && (
          <li
            className="h-8 w-8 cursor-pointer rounded-2xl border-2 border-transparent p-1 text-center transition-colors hover:border-red-600 hover:text-red-600"
            onClick={() => {
              handleChangePage({ page: nextPage })
              scrollToTop()
            }}
          >
            {nextPage}
          </li>
        )}
        {hasNextPage && nextPage !== lastPage && <li>...</li>}
        {lastPage !== currentPage && lastPage !== nextPage && (
          <li
            className="h-8 w-8 cursor-pointer rounded-2xl border-2 border-transparent p-1 text-center transition-colors hover:border-red-600 hover:text-red-600"
            onClick={() => {
              handleChangePage({ page: lastPage })
              scrollToTop()
            }}
          >
            {lastPage}
          </li>
        )}
        <div className="mr-auto">
          {hasNextPage && (
            <li
              className="flex cursor-pointer items-center p-1 text-red-600"
              onClick={() => {
                handleChangePage({ page: nextPage })
                scrollToTop()
              }}
            >
              بعدی
              <ArrowLeft className="icon text-red-600" />
            </li>
          )}
        </div>
      </ul>
    </nav>
  )
}

export default Pagination
