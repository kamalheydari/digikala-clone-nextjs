import { updateFilter } from "app/slices/filterSlice";
import { Icons } from "components";
import { sorts } from "utils/constatns";

export default function Sort({ dispatch, sort, productsLength }) {
  //? Handlers
  const handleSort = (e) => {
    dispatch(
      updateFilter({ name: e.target.name, value: e.target.dataset.value })
    );
  };

  return (
    <div className='hidden xl:flex xl:pb-4 xl:gap-x-4 xl:items-center '>
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
    </div>
  );
}
