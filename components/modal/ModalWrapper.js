import { closeModal } from "app/slices/modal.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function ModalWrapper({ isShow, children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isShow) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isShow]);

  return (
    <div
      className={`${
        isShow ? "opacity-100 visible" : "opacity-0 invisible "
      } transition-all duration-500 fixed inset-0 z-40`}
    >
      <div
        className='w-full h-full bg-gray-400/20'
        onClick={() => dispatch(closeModal())}
      />
      {children}
    </div>
  );
}
