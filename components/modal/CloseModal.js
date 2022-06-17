import { closeModal } from "app/slices/modalSlice";
import { Icons } from "components";
import { useDispatch } from "react-redux";

export default function CloseModal() {
  const dispatch = useDispatch();
  //? Handler
  const handleClick = () => {
    dispatch(closeModal());
  };
  return <Icons.Close className='cursor-pointer icon' onClick={handleClick} />;
}
