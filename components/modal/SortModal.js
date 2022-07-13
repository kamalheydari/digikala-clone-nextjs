import { useSelector } from "react-redux";
import { updateFilter } from "app/slices/filterSlice";
import { sorts } from "utils/constatns";

import { Icons, CloseModal } from "components";

export default function SortModal({ dispatch, closeModal }) {
  //? Store
  const { sort } = useSelector((state) => state.filter);

  //? Handlers
  const handleSort = (e) => {
    dispatch(
      updateFilter({ name: e.target.name, value: e.target.dataset.value })
    );
    dispatch(closeModal());
  };
  return (
    <div className='px-5 py-3 bg-white h-fit md:rounded-lg rounded-2xl'>
      <div className='flex justify-between py-3'>
        <h5>مرتب سازی بر اساس</h5>
        <CloseModal />
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
  );
}
