import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

import {
  DiscountProduct,
  ProductPrice,
  EmptySearchList,
  DataStateDisplay,
  Modal,
  ResponsiveImage,
} from 'components'
import { Close, Search } from 'icons'

import { truncate } from 'utils'

import { useGetProductsQuery } from 'services'

import { useDebounce, useDisclosure } from 'hooks'

interface Props {}

const SearchModal: React.FC<Props> = (props) => {
  //? Assets
  const [search, setSearch] = useState('')
  const searchRef = useRef<HTMLInputElement | null>(null)
  const [isShowSearchModal, searchModalHanlders] = useDisclosure()
  const debouncedSearch = useDebounce(search, 1200)

  //? Search Products Query
  const { data, ...productQueryProps } = useGetProductsQuery(
    {
      search,
    },
    { skip: !Boolean(debouncedSearch) }
  )

  //? Re-Renders
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

  //? Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleRemoveSearch = () => {
    setSearch('')
  }

  //? Render(s)
  return (
    <>
      <button
        onClick={searchModalHanlders.open}
        className='flex flex-grow max-w-3xl rounded-md bg-zinc-200/80'
      >
        <Search className='icon m-2 ' />
      </button>

      <Modal
        isShow={isShowSearchModal}
        onClose={searchModalHanlders.close}
        effect='bottom-to-top'
      >
        <Modal.Content
          onClose={searchModalHanlders.close}
          className='flex flex-col h-screen py-3 pl-2 pr-4 bg-white lg:h-fit md:rounded-lg gap-y-3'
        >
          <Modal.Header onClose={searchModalHanlders.close}>
            جستسجو
          </Modal.Header>
          <Modal.Body>
            <div className='flex flex-row-reverse my-3 rounded-md bg-zinc-200/80'>
              <button
                type='button'
                className='p-2.5'
                onClick={handleRemoveSearch}
              >
                <Close className='w-4 h-4 md:w-4.5 md:h-4.5 text-gray-700' />
              </button>
              <input
                type='text'
                placeholder='جستجو'
                className='flex-grow p-1 text-right bg-transparent outline-none input'
                ref={searchRef}
                value={search}
                onChange={handleChange}
              />
              <div className='p-2'>
                <Search className='icon ' />
              </div>
            </div>
            <div className='overflow-y-auto lg:max-h-[500px]'>
              <DataStateDisplay
                {...productQueryProps}
                dataLength={data ? data.productsLength : 0}
                emptyComponent={<EmptySearchList />}
              >
                <div className='px-4 py-3 divide-y space-y-3'>
                  {data?.productsLength &&
                    data.productsLength > 0 &&
                    search.length > 0 &&
                    data?.products.map((item) => (
                      <article key={item._id} className='py-2'>
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={() => searchModalHanlders.close()}
                        >
                          <ResponsiveImage
                            dimensions='w-20 h-20'
                            src={item.images[0].url}
                            alt={item.title}
                          />
                          <span className='py-2 text-sm'>
                            {truncate(item.title, 70)}
                          </span>
                          <div className='flex justify-between'>
                            <div>
                              {item.discount > 0 && (
                                <DiscountProduct discount={item.discount} />
                              )}
                            </div>
                            <ProductPrice
                              inStock={item.inStock}
                              discount={item.discount}
                              price={item.price}
                            />
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
