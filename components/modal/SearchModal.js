import { useGetDataQuery } from "app/slices/fetchApi.slice";
import {
  CloseModal,
  Icons,
  BigLoading,
  DiscountProduct,
  ProductPrice,
} from "components";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { truncate } from "utils/truncate";

export default function SearchModal({ isShow, dispatch, closeModal }) {
  const inputSearchRef = useRef();

  //? Local State
  const [search, setSearch] = useState("");

  //? Get Data Query
  const { data, isLoading } = useGetDataQuery({
    url: `/api/products?page_size=5&page=1&category=all&search=${search}`,
  });

  //? Reset Search
  useEffect(() => {
    if (isShow) {
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

      <div className=''>
        {isLoading ? (
          <div className='px-3 py-20'>
            <BigLoading />
          </div>
        ) : data.products.length === 0 ? (
          <div className='py-20'>
            <p className='text-center text-red-500'>محصول مورد نظر یافت نشد</p>
          </div>
        ) : data.products.length > 0 && search.length > 0 ? (
          <div className='px-4 py-3 divide-y'>
            {data.products.map((item) => (
              <article key={item._id} className='pt-1'>
                <div className='relative w-12 h-12'>
                  <Image src={item.images[0].url} layout='fill' />
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
                    <DiscountProduct product={item} />
                  </div>
                  <ProductPrice product={item} />
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
