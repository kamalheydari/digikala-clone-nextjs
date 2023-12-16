import { useRouter } from 'next/router'

import { sorts } from 'utils'

import { Modal } from 'components'
import { Check, Sort as SortIcon } from 'icons'

import { useChangeRoute, useDisclosure } from 'hooks'

interface Props {}

const Sort: React.FC<Props> = () => {
  // ? Assets
  const { query } = useRouter()
  const sortQuery = Number(query?.sort) || 1
  const pageQuery = Number(query?.page)

  const [isSort, sortHandlers] = useDisclosure()
  const changeRoute = useChangeRoute()

  // ? Handlers
  const handleSortChange = (item: (typeof sorts)[number]) => {
    changeRoute({
      page: pageQuery && pageQuery > 1 ? 1 : '',
      sort: item.value,
    })
    sortHandlers.close()
  }

  // ? Render(s)
  return (
    <>
      <div className="xl:hidden">
        <button type="button" className="flex items-center gap-x-1" onClick={sortHandlers.open}>
          <SortIcon className="icon h-6 w-6" />
          <span>{sorts[sortQuery - 1].name}</span>
        </button>

        <Modal isShow={isSort} onClose={sortHandlers.close} effect="buttom-to-fit">
          <Modal.Content
            onClose={sortHandlers.close}
            className="flex h-full flex-col gap-y-5 bg-white px-5 py-3 md:rounded-lg "
          >
            <Modal.Header onClose={sortHandlers.close}>مرتب سازی</Modal.Header>
            <Modal.Body>
              <div className="divide-y divide-gray-300/90">
                {sorts.map((item, i) => (
                  <div key={i} className="flex items-center">
                    <button
                      className="block w-full py-3 text-right text-sm text-gray-600"
                      type="button"
                      name="sort"
                      onClick={() => handleSortChange(item)}
                    >
                      {item.name}
                    </button>
                    {sortQuery === item.value && <Check className="icon" />}
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </div>
      <div className="hidden xl:flex xl:items-center xl:gap-x-4 ">
        <div className="flex items-center gap-x-1">
          <SortIcon className="icon " />
          <span>مرتب سازی:</span>
        </div>
        {sorts.map((item, i) => (
          <button
            key={i}
            className={`py-0.5  text-sm ${sortQuery === item.value ? 'text-red-600' : 'text-gray-700'}`}
            type="button"
            name="sort"
            onClick={() => handleSortChange(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  )
}

export default Sort
