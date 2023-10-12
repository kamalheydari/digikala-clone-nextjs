import { useRouter } from 'next/router'

import { ArrowLeft, ArrowRight2 } from 'icons'

import { useMediaQuery,useChangeRoute } from 'hooks'

import type { IPagination, QueryParams } from 'types'

interface Props {
  pagination: IPagination
  section: string
  client?: boolean
}

const Pagination: React.FC<Props> = (props) => {
  //? Props
  const { pagination, section, client } = props
  const {
    currentPage,
    nextPage,
    previousPage,
    hasNextPage,
    hasPreviousPage,
    lastPage,
  } = pagination

  //? Assets
  const isDesktop = useMediaQuery('(min-width:1024px)')
  const changeRoute = useChangeRoute()
  const { query } = useRouter()

  //? Handlers
  const scrollToTop = () => {
    const element = document.getElementById(section)!

    const scrollY =
      client && isDesktop ? element?.offsetTop - 115 : element?.offsetTop

    window.scrollTo(0, scrollY)
  }

  const handleChangePage = (pageQuery: QueryParams) => {
    changeRoute({
      ...query,
      ...pageQuery,
    })
  }

  //? Render(s)
  return (
    <nav>
      <ul className='inline-flex items-center w-full px-10 gap-x-2 farsi-digits'>
        <div className='ml-auto'>
          {hasPreviousPage && (
            <li
              className='flex items-center p-1 text-red-500 cursor-pointer'
              onClick={() => {
                handleChangePage({ page: previousPage })
                scrollToTop()
              }}
            >
              <ArrowRight2 className='text-red-500 icon' />
              قبلی
            </li>
          )}
        </div>
        {currentPage !== 1 && previousPage !== 1 && (
          <li
            className='w-8 h-8 p-1 text-center transition-colors border-2 border-transparent cursor-pointer hover:text-red-500 hover:border-red-500 rounded-2xl'
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
            className='w-8 h-8 p-1 text-center transition-colors border-2 border-transparent cursor-pointer hover:text-red-500 hover:border-red-500 rounded-2xl'
            onClick={() => {
              handleChangePage({ page: previousPage })
              scrollToTop()
            }}
          >
            {previousPage}
          </li>
        )}
        <li
          className='cursor-pointer w-8 h-8 p-1.5 text-center bg-red-500 text-white rounded-2xl'
          onClick={() => {
            handleChangePage({ page: currentPage })
            scrollToTop()
          }}
        >
          {currentPage}
        </li>
        {hasNextPage && (
          <li
            className='w-8 h-8 p-1 text-center transition-colors border-2 border-transparent cursor-pointer hover:text-red-500 hover:border-red-500 rounded-2xl'
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
            className='w-8 h-8 p-1 text-center transition-colors border-2 border-transparent cursor-pointer hover:text-red-500 hover:border-red-500 rounded-2xl'
            onClick={() => {
              handleChangePage({ page: lastPage })
              scrollToTop()
            }}
          >
            {lastPage}
          </li>
        )}
        <div className='mr-auto'>
          {hasNextPage && (
            <li
              className='flex items-center p-1 text-red-500 cursor-pointer'
              onClick={() => {
                handleChangePage({ page: nextPage })
                scrollToTop()
              }}
            >
              بعدی
              <ArrowLeft className='text-red-500 icon' />
            </li>
          )}
        </div>
      </ul>
    </nav>
  )
}

export default Pagination
