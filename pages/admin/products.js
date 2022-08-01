import { resetSelectedCategories } from "app/slices/category.slice";
import { useGetDataQuery } from "app/slices/fetchApi.slice";
import { openModal } from "app/slices/modal.slice";
import {
  BigLoading,
  Buttons,
  Icons,
  Pagination,
  SelectCategories,
} from "components";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const dispatch = useDispatch();
  const router = useRouter();
  const inputSearchRef = useRef();

  //? Local State
  const [page, setPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState("all");
  const [search, setSearch] = useState("");

  //? Store
  const { mainCategory, parentCategory, category } = useSelector(
    (state) => state.categories
  );

  //? Get Data Query
  const { data, isLoading, isSuccess } = useGetDataQuery({
    url: `/api/products?page_size=10&page=${page}&category=${filterCategory}&search=${search}`,
  });

  //? Reset Category
  useEffect(() => {
    return () => dispatch(resetSelectedCategories());
  }, []);

  //? Filter Category
  useEffect(() => {
    setPage(1);
    if (mainCategory.length > 0) setFilterCategory(mainCategory);
    if (parentCategory.length > 0)
      setFilterCategory((filterCategory) =>
        filterCategory.concat("/").concat(parentCategory)
      );
    if (category.length > 0) setFilterCategory(category);
  }, [mainCategory, parentCategory, category, search]);

  //? Handlers
  const handleDelete = (id) => {
    dispatch(
      openModal({
        isShow: true,
        id,
        type: "confirm-delete-product",
        title: "محصول",
      })
    );
  };

  const handleEdit = (id) => {
    router.push(`/admin/product/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(inputSearchRef.current.value);
  };

  const handleRemoveSearch = () => {
    inputSearchRef.current.value = "";
    setSearch("");
  };

  return (
    <>
      <Buttons.Back backRoute='/admin'>محصولات</Buttons.Back>
      <div className='section-divide-y' />
      {isLoading && (
        <div className='px-3 py-20'>
          <BigLoading />
        </div>
      )}

      {isSuccess && (
        <div className='p-3 space-y-7'>
          <form className='max-w-4xl mx-auto space-y-5' onSubmit={handleSubmit}>
            <div className='space-y-8  md:py-0 md:flex md:gap-x-8 lg:gap-x-0.5 xl:gap-x-10 md:items-baseline md:justify-between'>
              <SelectCategories productPage />
            </div>

            <div className='flex flex-row-reverse rounded-md bg-zinc-200/80 '>
              <button
                type='button'
                className='p-2'
                onClick={handleRemoveSearch}
              >
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
            </div>
          </form>

          {data.productsLength > 0 ? (
            <>
              <div className='overflow-x mt-7'>
                <table className='w-full overflow-scroll table-auto'>
                  <thead className='bg-zinc-50 h-9'>
                    <tr className='text-zinc-500'>
                      <th className='w-28'></th>
                      <th className='border-r-2 border-zinc-200'>
                        نام محصول (تعداد: {data.productsLength})
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.products.map((item) => (
                      <tr key={item._id} className='border-b-2 border-gray-100'>
                        <td className='flex items-center justify-center p-2 gap-x-4'>
                          <Buttons.Delete
                            onClick={() => handleDelete(item._id)}
                          />
                          <Buttons.Edit onClick={() => handleEdit(item._id)} />
                        </td>
                        <td className='p-2'>{item.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {data.productsLength > 10 && (
                <Pagination
                  currentPage={data.currentPage}
                  nextPage={data.nextPage}
                  previousPage={data.previousPage}
                  hasNextPage={data.hasNextPage}
                  hasPreviousPage={data.hasPreviousPage}
                  lastPage={data.lastPage}
                  setPage={setPage}
                />
              )}
            </>
          ) : (
            <div className='text-center text-red-500 lg:border lg:border-gray-200 lg:rounded-md lg:py-4'>
              کالایی یافت نشد
            </div>
          )}
        </div>
      )}
    </>
  );
}

Products.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
