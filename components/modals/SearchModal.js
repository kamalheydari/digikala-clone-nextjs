import { useRef, useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Icons,
  DiscountProduct,
  ProductPrice,
  EmptySearchList,
  ShowWrapper,
  Modal,
} from "components";

import { truncate } from "utils/truncate";
import { useGetProductsQuery } from "app/api/productApi";

export default function SearchModal(props) {
  //? Props
  const { isShow, onClose } = props;

  //? Refs
  const inputSearchRef = useRef();

  //? Local State
  const [search, setSearch] = useState("");

  //? Search Products Query
  const {
    data,
    isSuccess,
    isFetching,
    error,
    isError,
    refetch,
  } = useGetProductsQuery({
    url: `/api/products?page_size=5&page=1&category=all&search=${search}`,
    search,
    page: 1,
    filterCategory: "all",
  });

  //? Re-Renders
  //* Reset Search
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

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect='bottom-to-top'>
      <Modal.Content className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 '>
        <Modal.Header>جستسجو</Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
