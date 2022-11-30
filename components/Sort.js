import { updateFilter } from "app/slices/filter.slice";

import { sorts } from "utils/constatns";

import { Icons } from "components";

export default function Sort({
  isSort,
  sortHandlers,
  dispatch,
  sort,
  productsLength,
  chaneRoute,
}) {
  //? Handlers
  const handleSort = (item) => {
    dispatch(updateFilter({ name: "sort", value: item }));
    chaneRoute({ sort: item.value });
    sortHandlers.close();
  };

  return (
    <>
      <section className='hidden xl:flex xl:pb-4 xl:gap-x-4 xl:items-center '>
        <div className='flex items-center gap-x-1'>
          <Icons.Sort className='icon ' />
          <span>مرتب سازی:</span>
        </div>

        {sorts.map((item, i) => (
          <button
            key={i}
            className={`py-0.5  text-sm ${
              sort.value === item.value ? "text-red-500" : "text-gray-600"
            }`}
            type='button'
            name='sort'
            onClick={() => handleSort(item)}
          >
            {item.name}
          </button>
        ))}

        <span className='mr-auto'>{productsLength} کالا</span>
      </section>

      <div
        className={`${
          isSort ? "opacity-100 visible" : "opacity-0 invisible "
        } transition-all duration-300 fixed inset-0 z-40`}
      >
        <div
          className='fixed inset-0 z-20 bg-gray-50/50'
          onClick={sortHandlers.close}
        />
        <section
          className={`xl:hidden fixed transition-all duration-300 left-0 right-0 mx-auto z-30  w-full max-w-xl shadow-3xl border-t border-gray-200 rounded-xl px-5 py-3 bg-white h-fit md:rounded-lg  ${
            isSort ? "bottom-0" : "-bottom-full"
          }`}
        >
          <div className='flex justify-between py-3'>
            <h5>مرتب سازی بر اساس</h5>
            <button type='button' onClick={sortHandlers.close}>
              <Icons.Close className='icon' />
            </button>
          </div>
          <div className='divide-y'>
            {sorts.map((item, i) => (
              <div key={i} className='flex items-center'>
                <button
                  className='block w-full py-3 text-right text-gray-700'
                  type='button'
                  name='sort'
                  onClick={() => handleSort(item)}
                >
                  {item.name}
                </button>
                {sort.value === item.value && <Icons.Check className='icon' />}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
