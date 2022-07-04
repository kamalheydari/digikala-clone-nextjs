import { Icons } from "components";

export default function Pagination({
  currentPage,
  nextPage,
  previousPage,
  hasNextPage,
  hasPreviousPage,
  lastPage,
  setPage,
}) {
  return (
    <nav>
      <ul className='inline-flex items-center gap-x-2 w-full'>
        <div className='ml-auto'>
          {hasPreviousPage && (
            <li
              className='cursor-pointer p-1 flex justify-center text-red-500'
              onClick={() => setPage(previousPage)}
            >
              <Icons.ArrowRight2 className=' icon text-red-500' />
              قبلی
            </li>
          )}
        </div>
        {currentPage !== 1 && previousPage !== 1 && (
          <li
            className='cursor-pointer w-8 h-8 p-1 text-center  border-2 border-transparent hover:text-red-500 transition-colors hover:border-red-500 rounded-2xl'
            onClick={() => setPage(1)}
          >
            1
          </li>
        )}
        {hasPreviousPage && previousPage !== 1 && <li>...</li>}

        {hasPreviousPage && (
          <li
            className='cursor-pointer w-8 h-8 p-1 text-center  border-2 border-transparent hover:text-red-500 transition-colors hover:border-red-500 rounded-2xl'
            onClick={() => setPage(previousPage)}
          >
            {previousPage}
          </li>
        )}
        <li
          className='cursor-pointer w-8 h-8 p-1.5 text-center bg-red-500 text-white rounded-2xl'
          onClick={() => setPage(currentPage)}
        >
          {currentPage}
        </li>
        {hasNextPage && (
          <li
            className='cursor-pointer w-8 h-8 p-1 text-center  border-2 border-transparent hover:text-red-500 transition-colors hover:border-red-500 rounded-2xl'
            onClick={() => setPage(nextPage)}
          >
            {nextPage}
          </li>
        )}
        {hasNextPage && nextPage !== lastPage && <li>...</li>}
        {lastPage !== currentPage && lastPage !== nextPage && (
          <li
            className='cursor-pointer w-8 h-8 p-1 text-center  border-2 border-transparent hover:text-red-500 transition-colors hover:border-red-500 rounded-2xl'
            onClick={() => setPage(lastPage)}
          >
            {lastPage}
          </li>
        )}
        <div className='mr-auto'>
          {hasNextPage && (
            <li
              className='cursor-pointer p-1  flex justify-center text-red-500'
              onClick={() => setPage(nextPage)}
            >
              بعدی
              <Icons.ArrowLeft className='icon text-red-500' />
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
}
