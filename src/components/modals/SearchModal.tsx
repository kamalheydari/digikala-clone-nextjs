import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

import { truncate } from '@/utils'

import { useGetProductsQuery } from '@/services'

import { useDebounce, useDisclosure } from '@/hooks'

import { Close, Search } from '@/icons'
import { EmptySearchList } from '@/components/emptyList'
import { ProductDiscountTag, ProductPriceDisplay } from '@/components/product'
import { DataStateDisplay } from '@/components/shared'
import { Modal, ResponsiveImage } from '@/components/ui'

interface Props {}

const SearchModal: React.FC<Props> = (props) => {
  // ? Assets
  const [search, setSearch] = useState('')
  const searchRef = useRef<HTMLInputElement | null>(null)
  const [isShowSearchModal, searchModalHanlders] = useDisclosure()
  const debouncedSearch = useDebounce(search, 1200)

  // ? Search Products Query
  const { data, ...productQueryProps } = useGetProductsQuery(
    {
      search,
    },
    { skip: !debouncedSearch }
  )

  // ? Re-Renders
  //* Reset Search
  useEffect(() => {
    if (!isShowSearchModal) {
      setSearch('')
    }
  }, [isShowSearchModal])

  //* Use useEffect to set focus after a delay when the modal is shown
  useEffect(() => {
    if (isShowSearchModal) {
      const timeoutId = setTimeout(() => {
        searchRef.current?.focus()
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [isShowSearchModal])

  // ? Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleRemoveSearch = () => {
    setSearch('')
  }

  // ? Render(s)
  return (
    <>
      <button onClick={searchModalHanlders.open} className="flex max-w-3xl grow rounded-md bg-zinc-200/80">
        <Search className="icon m-2 " />
      </button>

      <Modal isShow={isShowSearchModal} onClose={searchModalHanlders.close} effect="bottom-to-top">
        <Modal.Content
          onClose={searchModalHanlders.close}
          className="flex h-screen flex-col gap-y-3 bg-white py-3 pl-2 pr-4 md:rounded-lg lg:h-fit"
        >
          <Modal.Header onClose={searchModalHanlders.close}>جستسجو</Modal.Header>
          <Modal.Body>
            <div className="my-3 flex flex-row-reverse rounded-md bg-zinc-200/80">
              <button type="button" className="p-2.5" onClick={handleRemoveSearch}>
                <Close className="h-4 w-4 text-gray-700 md:h-5 md:w-5" />
              </button>
              <input
                type="text"
                placeholder="جستجو"
                className="input grow bg-transparent p-1 text-right outline-none"
                ref={searchRef}
                value={search}
                onChange={handleChange}
              />
              <div className="p-2">
                <Search className="icon " />
              </div>
            </div>
            <div className="overflow-y-auto lg:max-h-[500px]">
              <DataStateDisplay
                {...productQueryProps}
                dataLength={data ? data.productsLength : 0}
                emptyComponent={<EmptySearchList />}
              >
                <div className="space-y-3 divide-y px-4 py-3">
                  {data?.productsLength &&
                    data.productsLength > 0 &&
                    search.length > 0 &&
                    data?.products.map((item) => (
                      <article key={item._id} className="py-2">
                        <Link href={`/products/${item.slug}`} onClick={() => searchModalHanlders.close()}>
                          <ResponsiveImage
                            dimensions="w-20 h-20"
                            src={item.images[0].url}
                            blurDataURL={item.images[0].placeholder}
                            alt={item.title}
                            imageStyles="object-contain"
                          />
                          <span className="py-2 text-sm">{truncate(item.title, 70)}</span>
                          <div className="flex justify-between">
                            <div>{item.discount > 0 && <ProductDiscountTag discount={item.discount} />}</div>
                            <ProductPriceDisplay inStock={item.inStock} discount={item.discount} price={item.price} />
                          </div>
                        </Link>
                      </article>
                    ))}
                </div>
              </DataStateDisplay>
            </div>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default SearchModal
