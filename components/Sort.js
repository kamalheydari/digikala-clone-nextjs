import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { sorts } from 'utils'

import { Icons, Modal } from 'components'

import { useDisclosure } from 'hooks'

export default function Sort({ handleChangeRoute }) {
  //? Assets
  const [isSort, sortHandlers] = useDisclosure()
  const { query } = useRouter()

  //? State
  const [sort, setSort] = useState(
    query.sort ? sorts[query.sort - 1] : sorts[0]
  )

  //? Handlers
  const handleChangeSort = (item) => {
    setSort(sorts[item.value - 1])
    handleChangeRoute({ sort: item.value })
    sortHandlers.close()
  }

  useEffect(() => {
    setSort(sorts[0])
  }, [query.category])

  //? Render(s)
  return (
    <>
      <div className='xl:hidden'>
        <button
          type='button'
          className='flex items-center gap-x-1'
          onClick={sortHandlers.open}
        >
          <Icons.Sort className='w-6 h-6 icon' />
          <span>{sort?.name}</span>
        </button>

        <Modal
          isShow={isSort}
          onClose={sortHandlers.close}
          effect='buttom-to-fit'
        >
          <Modal.Content className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 '>
            <Modal.Header>مرتب سازی</Modal.Header>
            <Modal.Body>
              <div className='divide-y'>
                {sorts.map((item, i) => (
                  <div key={i} className='flex items-center'>
                    <button
                      className='block w-full py-3 text-right text-gray-700'
                      type='button'
                      name='sort'
                      onClick={() => handleChangeSort(item)}
                    >
                      {item.name}
                    </button>
                    {sort?.value === item.value && (
                      <Icons.Check className='icon' />
                    )}
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </div>
      <div className='hidden xl:flex xl:gap-x-4 xl:items-center '>
        <div className='flex items-center gap-x-1'>
          <Icons.Sort className='icon ' />
          <span>مرتب سازی:</span>
        </div>
        {sorts.map((item, i) => (
          <button
            key={i}
            className={`py-0.5  text-sm ${
              sort?.value === item.value ? 'text-red-500' : 'text-gray-600'
            }`}
            type='button'
            name='sort'
            onClick={() => handleChangeSort(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  )
}
