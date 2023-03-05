import { Icons } from 'components'

export default function Pagination({
  currentPage,
  nextPage,
  previousPage,
  hasNextPage,
  hasPreviousPage,
  lastPage,
  setPage,
  section,
  client,
}) {
  const scrollToTop = () => {
    const element = document.getElementById(section)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    if (client && window.innerWidth > 1024) {
      window.scrollTo(0, 60)
    }
  }

  return (
    <nav>
      <ul className='inline-flex items-center w-full px-10 gap-x-2 farsi-digits'>
        <div className='ml-auto'>
          {hasPreviousPage && (
            <li
              className='flex items-center p-1 text-red-500 cursor-pointer'
              onClick={() => {
                setPage(previousPage)
                scrollToTop()
              }}
            >
              <Icons.ArrowRight2 className='text-red-500 icon' />
              قبلی
            </li>
          )}
        </div>
        {currentPage !== 1 && previousPage !== 1 && (
          <li
            className='w-8 h-8 p-1 text-center transition-colors border-2 border-transparent cursor-pointer hover:text-red-500 hover:border-red-500 rounded-2xl'
            onClick={() => {
              setPage(1)
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
              setPage(previousPage)
              scrollToTop()
            }}
          >
            {previousPage}
          </li>
        )}
        <li
          className='cursor-pointer w-8 h-8 p-1.5 text-center bg-red-500 text-white rounded-2xl'
          onClick={() => {
            setPage(currentPage)
            scrollToTop()
          }}
        >
          {currentPage}
        </li>
        {hasNextPage && (
          <li
            className='w-8 h-8 p-1 text-center transition-colors border-2 border-transparent cursor-pointer hover:text-red-500 hover:border-red-500 rounded-2xl'
            onClick={() => {
              setPage(nextPage)
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
              setPage(lastPage)
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
                setPage(nextPage)
                scrollToTop()
              }}
            >
              بعدی
              <Icons.ArrowLeft className='text-red-500 icon' />
            </li>
          )}
        </div>
      </ul>
    </nav>
  )
}
