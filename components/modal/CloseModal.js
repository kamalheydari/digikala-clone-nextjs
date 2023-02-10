import { useDispatch } from "react-redux";

import { closeModal } from "app/slices/modal.slice";

import { Icons } from "components";

export default function CloseModal() {
  const dispatch = useDispatch();
  //? Handler
  const handleClick = () => {
    dispatch(closeModal());
  };
  return (
    <button onClick={handleClick} className='p-1'>
      <Icons.Close className='icon' />
    </button>
  );
}
