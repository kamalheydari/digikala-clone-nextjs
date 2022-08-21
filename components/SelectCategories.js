import { useRouter } from "next/router";
import { resetParentCategory, selectCategory } from "app/slices/category.slice";
import { useDispatch, useSelector } from "react-redux";

export default function SelectCategories({ detailsHome, productPage }) {
  const router = useRouter();
  const dispatch = useDispatch();

  //? Store
  const { categories, mainCategory, parentCategory, category } = useSelector(
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
      dispatch(selectCategory({ type: "mainCategory", value: e.target.value }));
      dispatch(resetParentCategory());
    }

    if (e.target.name === "parentCategory")
      dispatch(
        selectCategory({ type: "parentCategory", value: e.target.value })
      );

    if (e.target.name === "category")
      dispatch(selectCategory({ type: "category", value: e.target.value }));
  };

  const handleRouteChange = (e) => {
    router.push("/admin/details/" + e.target.value);
  };

  return (
    <>
      <div className='flex flex-col items-start justify-between gap-y-2'>
        <label htmlFor='mainCategory'>دسته‌بندی اصلی</label>
        <select
          className='border-2 rounded-sm py-0.5 px-3 outline-none w-56 text-gray-800'
          name='mainCategory'
          id='mainCategory'
          onChange={handleChange}
          value={mainCategory}
        >
          <option value=''></option>
          {mainCategories.slice(0,2).map((item, index) => (
            <option key={index} value={item.category} className='text-gray-700'>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col items-start justify-between gap-y-2 '>
        <label htmlFor='parentCategory'>دسته‌بندی والد</label>
        {detailsHome ? (
          <select
            className='border-2 rounded-sm py-0.5 px-3 outline-none w-56 text-gray-800'
            name='parentCategory'
            id='parentCategory'
            onChange={handleRouteChange}
            value={parentCategory}
          >
            <option value=''></option>
            {parentCategories.map((item, index) => (
              <option value={item._id} key={index} className='text-gray-700'>
                {item.name}
              </option>
            ))}
          </select>
        ) : (
          <select
            className='border-2 rounded-sm py-0.5 px-3 outline-none w-56 text-gray-800'
            name='parentCategory'
            id='parentCategory'
            onChange={handleChange}
            value={parentCategory}
          >
            <option value=''></option>
            {parentCategories.map((item, index) => (
              <option value={item.slug} key={index} className='text-gray-700'>
                {item.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {productPage && (
        <div className='flex flex-col items-start justify-between gap-y-2'>
          <label htmlFor='category'>دسته‌بندی</label>
          <select
            className='border-2 rounded-sm py-0.5 px-3 outline-none w-56 text-gray-800'
            name='category'
            id='category'
            onChange={handleChange}
            value={category}
          >
            <option value=''></option>
            {categoryArray.map((item, index) => (
              <option
                key={index}
                value={item.category}
                className='text-gray-700'
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
