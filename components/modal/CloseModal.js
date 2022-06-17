import { useDispatch } from "react-redux";

import { closeModal } from "app/slices/modalSlice";

import { Icons } from "components";

export default function CloseModal() {
  const dispatch = useDispatch();
  //? Handler
  const handleClick = () => {
    dispatch(closeModal());
  };
  return <Icons.Close className='cursor-pointer icon' onClick={handleClick} />;
}
