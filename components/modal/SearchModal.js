import { useRef, useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import { useGetDataQuery } from "app/slices/fetchApi.slice";

import {
  CloseModal,
  Icons,
  DiscountProduct,
  ProductPrice,
  EmptySearchList,
  ShowWrapper,
  ModalWrapper,
} from "components";

import { truncate } from "utils/truncate";

export default function SearchModal({ isShow, dispatch, closeModal }) {
  const inputSearchRef = useRef();

  //? Local State
  const [search, setSearch] = useState("");

  //? Get Data Query
  const {
    data,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetDataQuery({
    url: `/api/products?page_size=5&page=1&category=all&search=${search}`,
  });

  //? Reset Search
  useEffect(() => {
    if (!isShow) {
      inputSearchRef.current.value = "";
      setSearch("");
    }
  }, [isShow]);

  //? Handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputSearchRef.current.value);
  };

  const handleRemoveSearch = () => {
    inputSearchRef.current.value = "";
    setSearch("");
  };

  return (
    <ModalWrapper isShow={isShow}>
      <div
        className={`
  ${
    isShow ? "bottom-0 lg:top-20" : "-bottom-full lg:top-60"
  } w-full h-[90vh] lg:h-fit lg:max-w-3xl lg:bg-white lg:py-4 lg:px-1 lg:rounded-md fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
        <div className='h-full lg:h-[770px] px-5 py-3 bg-white md:rounded-lg gap-y-3 overflow-y-auto'>
          <div className='py-2 border-b-2 border-gray-200'>
            <div className='flex justify-between '>
              <span className='text-sm text-black'>جستجو</span>
              <CloseModal />
            </div>
          </div>

          <form
            className='flex flex-row-reverse my-3 rounded-md bg-zinc-200/80'
            onSubmit={handleSubmit}
          >
            <button type='button' className='p-2' onClick={handleRemoveSearch}>
              <Icons.Close className='icon' />
            </button>
            <input
              type='text'
              placeholder='جستجو'
              className='flex-grow p-1 text-right bg-transparent outline-none input'
              ref={inputSearchRef}
              defaultValue={search}
            />
            <button type='submit' className='p-2'>
              <Icons.Search className='icon' />
            </button>
          </form>
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
                      <Image src={item.images[0].url} layout='fill' alt={item.name}/>
                    </div>
                    <Link href={`/products/${item._id}`}>
                      <a
                        onClick={() => dispatch(closeModal())}
                        className='py-1 text-sm'
                      >
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
      </div>
    </ModalWrapper>
  );
}
