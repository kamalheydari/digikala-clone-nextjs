import { Filter as FilterIcon } from '@/icons'

import { useDisclosure } from '@/hooks'

import { Modal } from '@/components/ui'
import { ProductFilterControls } from '@/components/product'

interface Props {
  mainMaxPrice: number | undefined
  mainMinPrice: number | undefined
}

const FilterModal: React.FC<Props> = (props) => {
  // ? Props
  const { mainMinPrice, mainMaxPrice } = props

  // ? Assets
  const [isFilters, filtersHandlers] = useDisclosure()

  // ? Render(s)
  return (
    <>
      <button type="button" className="flex items-center gap-x-1" onClick={filtersHandlers.open}>
        <FilterIcon className="icon h-6 w-6" />
        <span>فیلتر</span>
      </button>

      <Modal isShow={isFilters} onClose={filtersHandlers.close} effect="bottom-to-top">
        <Modal.Content
          onClose={filtersHandlers.close}
          className="flex h-full flex-col gap-y-5 bg-white px-5 py-3 md:rounded-lg "
        >
          <Modal.Header onClose={filtersHandlers.close}>فیلترها</Modal.Header>
          <Modal.Body>
            <ProductFilterControls
              mainMinPrice={mainMinPrice}
              mainMaxPrice={mainMaxPrice}
              onClose={filtersHandlers.close}
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default FilterModal
