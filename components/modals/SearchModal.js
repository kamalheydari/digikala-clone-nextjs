import { useState, useEffect } from 'react'
import Link from 'next/link'

import {
  Icons,
  DiscountProduct,
  ProductPrice,
  EmptySearchList,
  ShowWrapper,
  Modal,
  ResponsiveImage,
} from 'components'

import { truncate } from 'utils'

import { useGetProductsQuery } from 'services'

import { useDebounce } from 'hooks'

export default function SearchModal(props) {
  //? Props
  const { isShow, onClose } = props

  //? States
  const [search, setSearch] = useState('')

  //? Assets
  const debouncedSearch = useDebounce(search, 1200)

  //? Search Products Query
  const { data, isSuccess, isFetching, error, isError, refetch } =
    useGetProductsQuery(
      {
        search,
        page: 1,
        filterCategory: 'all',
      },
      { skip: !Boolean(debouncedSearch) }
    )

  //? Re-Renders
  //* Reset Search
  useEffect(() => {
    if (!isShow) {
      setSearch('')
    }
  }, [isShow])
  //? Handlers
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleRemoveSearch = () => {
    setSearch('')
  }

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect='bottom-to-top'>
      <Modal.Content className='flex flex-col h-screen py-3 pl-2 pr-4 bg-white lg:h-fit md:rounded-lg gap-y-3'>
        <Modal.Header>جستسجو</Modal.Header>
        <Modal.Body>
          <div className='flex flex-row-reverse my-3 rounded-md bg-zinc-200/80'>
            <button type='button' className='p-2' onClick={handleRemoveSearch}>
              <Icons.Close className='icon' />
            </button>
            <input
              type='text'
              placeholder='جستجو'
              className='flex-grow p-1 text-right bg-transparent outline-none input'
              value={search}
              onChange={handleChange}
            />
            <div className='p-2'>
              <Icons.Search className='icon ' />
            </div>
          </div>
          <div className='overflow-y-auto lg:max-h-[500px]'>
            <ShowWrapper
              error={error}
              isError={isError}
              refetch={refetch}
              isFetching={isFetching}
              isSuccess={isSuccess}
              dataLength={data ? data.productsLength : 0}
              emptyComponent={<EmptySearchList />}
            >
              <div className='px-4 py-3 divide-y space-y-3'>
                {data?.productsLength > 0 &&
                  search.length > 0 &&
                  data?.products.map((item) => (
                    <article key={item._id} className='py-2'>
                      <Link
                        href={`/products/${item._id}`}
                        onClick={() => onClose()}
                      >
                        <ResponsiveImage
                          dimensions='w-20 h-20'
                          src={item.images[0].url}
                          alt={item.name}
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
            </ShowWrapper>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
