import { updateFilter } from "app/slices/filter.slice";

import { sorts } from "utils/constatns";

import { Icons } from "components";

export default function Sort({
  showSort,
  setShowSort,
  dispatch,
  sort,
  productsLength,
}) {
  //? Handlers
  const handleSort = (e) => {
    dispatch(
      updateFilter({ name: e.target.name, value: e.target.dataset.value })
    );
    setShowSort(false);
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
            className={`py-0.5 text-gray-600 text-sm ${
              sort === item.name && "text-red-500"
            }`}
            type='button'
            data-value={item.name}
            name='sort'
            onClick={handleSort}
          >
            {item.name}
          </button>
        ))}

        <span className='mr-auto'>{productsLength} کالا</span>
      </section>

      <section
        className={`xl:hidden fixed transition-all duration-700 left-0 right-0 mx-auto z-10 bg-white w-full h-fit shadow-3xl border-t border-gray-200 rounded-xl  ${
          showSort ? "bottom-0" : "-bottom-full"
        }`}
      >
        <div className='px-5 py-3 bg-white h-fit md:rounded-lg rounded-2xl'>
          <div className='flex justify-between py-3'>
            <h5>مرتب سازی بر اساس</h5>
            <button type='button' onClick={() => setShowSort(false)}>
              <Icons.Close className='icon' />
            </button>
          </div>
          <div className='divide-y'>
            {sorts.map((item, i) => (
              <div key={i} className='flex items-center'>
                <button
                  className='block w-full py-3 text-right text-gray-700'
                  type='button'
                  data-value={item.name}
                  name='sort'
                  onClick={handleSort}
                >
                  {item.name}
                </button>
                {sort === item.name && <Icons.Check className='icon' />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
