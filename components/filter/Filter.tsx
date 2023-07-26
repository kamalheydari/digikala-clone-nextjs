import { Modal, FilterOperation, Icons } from 'components'

import { useDisclosure } from 'hooks'

import type { NewQueries } from 'hooks/useChangeRoute'

interface Props {
  mainMaxPrice: number | undefined
  mainMinPrice: number | undefined
  handleChangeRoute: (newQueries: NewQueries) => void
}

const Filter: React.FC<Props> = (props) => {
  //? Props
  const { mainMinPrice, mainMaxPrice, handleChangeRoute } = props

  //? Assets
  const [isFilters, filtersHandlers] = useDisclosure()

  //? Render(s)
  return (
    <>
      <button
        type='button'
        className='flex items-center gap-x-1'
        onClick={filtersHandlers.open}
      >
        <Icons.Filter className='w-6 h-6 icon' />
        <span>فیلتر</span>
      </button>

      <Modal
        isShow={isFilters}
        onClose={filtersHandlers.close}
        effect='bottom-to-top'
      >
        <Modal.Content
          onClose={filtersHandlers.close}
          className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 '
        >
          <Modal.Header onClose={filtersHandlers.close}>فیلترها</Modal.Header>
          <Modal.Body>
            <FilterOperation
              mainMinPrice={mainMinPrice}
              mainMaxPrice={mainMaxPrice}
              handleChangeRoute={handleChangeRoute}
              onClose={filtersHandlers.close}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default Filter
