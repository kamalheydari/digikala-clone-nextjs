import { useDispatch, useSelector } from 'react-redux'

import { updateFilter } from 'store'

import { sorts } from 'utils'

import { Icons, Modal } from 'components'

import useDisclosure from 'hooks/useDisclosure'

export default function Sort(props) {
  //? Props
  const { changeRoute } = props

  //? Assets
  const [isSort, sortHandlers] = useDisclosure()
  const dispatch = useDispatch()

  //? Store
  const { sort } = useSelector((state) => state.filter)

  //? Handlers
  const handleSort = (item) => {
    dispatch(updateFilter({ name: 'sort', value: item }))
    changeRoute({ sort: item.value })
    sortHandlers.close()
  }

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
                      onClick={() => handleSort(item)}
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
            onClick={() => handleSort(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  )
}
