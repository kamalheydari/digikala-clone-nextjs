import { Icons, SearchModal } from 'components'

import { useDisclosure } from 'hooks'

export default function Search() {
  //? Assets
  const [isShowSearchModal, searchModalHanlders] = useDisclosure()

  //? Render(s)
  return (
    <>
      <SearchModal
        isShow={isShowSearchModal}
        onClose={searchModalHanlders.close}
      />
      <div
        onClick={searchModalHanlders.open}
        className='flex flex-row-reverse flex-grow max-w-3xl rounded-md bg-zinc-200/80 '
      >
        <input
          disabled={true}
          type='text'
          placeholder='جستجو'
          className='flex-grow p-1 text-right bg-transparent outline-none cursor-pointer input'
        />
        <button className='p-2'>
          <Icons.Search className='icon' />
        </button>
      </div>
    </>
  )
}
