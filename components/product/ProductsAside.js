import { resetFilter, updateFilter } from "app/slices/filter.slice";
import { Checkbox, Icons } from "components";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function ProductsAside({
  dispatch,
  main_maxPrice,
  main_minPrice,
  setShowFilters,
  chaneRoute,
  resetRoute
}) {
  const { inStock, discount, max_price, min_price } = useSelector(
    (state) => state.filter
  );

  //? Handlers
  const handlefilter = (e) => {
    if (e.target.type === "checkbox") {
      dispatch(updateFilter({ name: e.target.name, value: e.target.checked }));
      chaneRoute({ [e.target.name]: e.target.checked });
    } else if (e.target.type === "number") {
      dispatch(updateFilter({ name: e.target.name, value: +e.target.value }));
    }
  };

  const handleReset = () => {
    dispatch(resetFilter({ maxPrice: main_maxPrice, minPrice: main_minPrice }));
    resetRoute()
  };

  return (
    <aside className='px-6 mt-6 divide-y xl:w-60 2xl:w-64 xl:border xl:border-gray-200 xl:rounded-md xl:py-4 xl:px-3'>
      <div className='flex items-center pb-4'>
        <button
          type='button'
          onClick={() => setShowFilters(false)}
          className='ml-4 xl:hidden'
        >
          <Icons.Close className='icon' />
        </button>
        <span className='ml-auto text-gray-800'>فیلترها</span>
        <button
          type='button'
          className='text-sm text-sky-500'
          onClick={handleReset}
        >
          حذف فیلتر‌ها
        </button>
      </div>

      <Checkbox name='inStock' value={inStock} onChange={handlefilter}>
        فقط کالاهای موجود
      </Checkbox>
      <Checkbox name='discount' value={discount} onChange={handlefilter}>
        فقط کالاهای فروش ویژه
      </Checkbox>

      <div className='py-4'>
        <span className='font-medium text-gray-700'>محدوده قیمت</span>
        <div className='flex items-center justify-between gap-x-1'>
          <span>از</span>
          <input
            type='number'
            className='w-3/4 px-1 text-xl text-left border-b border-gray-200 outline-none farsi-digits'
            name='min_price'
            min={main_minPrice}
            max={main_maxPrice}
            value={min_price}
            onChange={(e) => {
              handlefilter(e);
              chaneRoute({ price: `${e.target.value}-${max_price}` });
            }}
          />
          <div className='relative w-6 h-6 '>
            <Image src='/icons/toman.svg' layout='fill' alt='تومان' />
          </div>
        </div>
        <div className='flex items-center justify-between mt-2 mb-4 gap-x-1'>
          <span>تا</span>
          <input
            type='number'
            className='w-3/4 px-1 text-xl text-left border-b border-gray-200 outline-none farsi-digits'
            name='max_price'
            value={max_price}
            max={main_maxPrice}
            min={main_minPrice}
            onChange={(e) => {
              handlefilter(e),
                chaneRoute({ price: `${min_price}-${e.target.value}` });
            }}
          />
          <div className='relative w-6 h-6 '>
            <Image src='/icons/toman.svg' layout='fill' alt='تومان' />
          </div>
        </div>
      </div>
    </aside>
  );
}
