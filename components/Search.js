import { useDispatch } from "react-redux";

import { Icons } from "components";
import { openModal } from "app/slices/modal.slice";

export default function Search() {
  const dispatch = useDispatch();

  //? Handlers
  const handleOpenModal = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "search",
      })
    );
  };
  return (
    <div
      onClick={handleOpenModal}
      className='flex flex-row-reverse flex-grow max-w-3xl rounded-md bg-zinc-200/80 '
    >
      <input
        type='text'
        placeholder='جستجو'
        className='flex-grow p-1 text-right bg-transparent outline-none input'
      />
      <button className='p-2'>
        <Icons.Search className='icon' />
      </button>
    </div>
  );
}
