import { useRouter } from "next/router";
import {
  resetParentCategory,
  selecteCategory,
  selecteMainCategory,
  selecteParentCategory,
} from "app/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";

export default function SelectCategories({ detailsHome, productPage }) {
  const router = useRouter();
  const dispatch = useDispatch();

  //? Store
  const { categories, mainCategory, parentCategory } = useSelector(
    (state) => state.categories
  );

  //? Initial Select box
  const parentCategories = categories.filter(
    (category) => category.parent === mainCategory
  );
  const mainCategories = categories.filter(
    (category) => category.parent === "/"
  );
  const categoryArray = categories.filter(
    (category) => category.parent === "/" + parentCategory
  );

  const handleChange = (e) => {
    if (e.target.name === "mainCategory") {
      dispatch(selecteMainCategory(e.target.value));
      dispatch(resetParentCategory());
    }
    if (e.target.name === "parentCategory")
      dispatch(selecteParentCategory(e.target.value));

    if (e.target.name === "category")
      dispatch(selecteCategory(e.target.value));

  };

  const handleRouteChange = (e) => {
    router.push("/admin/details/" + e.target.value);
  };

  return (
    <>
      <div className='flex flex-col items-start justify-between gap-y-2'>
        <label
          className='text-xs text-gray-700 lg:text-sm md:min-w-max'
          htmlFor='mainCategory'
        >
          دسته‌بندی اصلی
        </label>
        <select
          className='border-2 rounded-sm py-0.5 px-3 outline-none w-56'
          name='mainCategory'
          id='mainCategory'
          onChange={handleChange}
        >
          <option></option>
          {mainCategories.map((item, index) => (
            <option key={index} value={item.category}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col items-start justify-between gap-y-2 '>
        <label
          className='text-xs text-gray-700 lg:text-sm md:min-w-max'
          htmlFor='parentCategory'
        >
          دسته‌بندی والد
        </label>
        {detailsHome ? (
          <select
            className='border-2 rounded-sm py-0.5 px-3 outline-none w-56'
            name='parentCategory'
            id='parentCategory'
            onChange={handleRouteChange}
          >
            <option></option>
            {parentCategories.map((item, index) => (
              <option value={item._id} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        ) : (
          <select
            className='border-2 rounded-sm py-0.5 px-3 outline-none w-56'
            name='parentCategory'
            id='parentCategory'
            onChange={handleChange}
          >
            <option></option>
            {parentCategories.map((item, index) => (
              <option value={item.slug} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {productPage && (
        <div className='flex flex-col items-start justify-between gap-y-2'>
          <label
            className='text-xs text-gray-700 lg:text-sm md:min-w-max'
            htmlFor='category'
          >
            دسته‌بندی
          </label>
          <select
            className='border-2 rounded-sm py-0.5 px-3 outline-none w-56'
            name='category'
            id='category'
            onChange={handleChange}
          >
            <option></option>
            {categoryArray.map((item, index) => (
              <option key={index} value={item.category}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
