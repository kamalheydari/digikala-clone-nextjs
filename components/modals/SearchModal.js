import { useState, useEffect } from "react"

import Image from "next/image"
import Link from "next/link"

import {
  Icons,
  DiscountProduct,
  ProductPrice,
  EmptySearchList,
  ShowWrapper,
  Modal,
} from "components"

import { truncate } from "utils/truncate"
import { useGetProductsQuery } from "app/api/productApi"
import useDebounce from "hooks/useDebounce"

export default function SearchModal(props) {
  //? Props
  const { isShow, onClose } = props

  //? States
  const [search, setSearch] = useState("")

  //? Assets
  const debouncedSearch = useDebounce(search, 1200)

  //? Search Products Query
  const { data, isSuccess, isFetching, error, isError, refetch } =
    useGetProductsQuery(
      {
        search,
        page: 1,
        filterCategory: "all",
      },
      { skip: !Boolean(debouncedSearch) }
    )

  //? Re-Renders
  //* Reset Search
  useEffect(() => {
    if (!isShow) {
      setSearch("")
    }
  }, [isShow])

  //? Handlers
  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleRemoveSearch = () => {
    setSearch("")
  }

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect='bottom-to-top'>
      <Modal.Content className='flex flex-col h-screen lg:h-fit  pl-2 pr-4 py-3 bg-white md:rounded-lg gap-y-3'>
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
              emptyElement={<EmptySearchList />}
            >
              <div className='px-4 py-3 divide-y'>
                {data?.productsLength > 0 &&
                  search.length > 0 &&
                  data?.products.map((item) => (
                    <article key={item._id} className='pt-1'>
                      <div className='relative w-12 h-12'>
                        <Image
                          src={item.images[0].url}
                          layout='fill'
                          alt={item.name}
                        />
                      </div>
                      <Link href={`/products/${item._id}`}>
                        <a onClick={() => onClose()} className='py-1 text-sm'>
                          {truncate(item.title, 70)}
                        </a>
                      </Link>
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
