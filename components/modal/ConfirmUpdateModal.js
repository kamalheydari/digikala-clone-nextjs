import {
  closeModal,
  confirmUpdateAction,
  confirmReset,
} from "app/slices/modal.slice";

import { Loading, ModalWrapper } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ConfirmUpdateModal({ isLoading, isSuccess }) {
  const dispatch = useDispatch();

  //? Store
  const { isShow, title, type } = useSelector((state) => state.modal);

  //? Handlers
  const handleConfirmClick = () => {
    dispatch(confirmUpdateAction());
  };

  const handleCancleClick = () => {
    dispatch(confirmReset());
    dispatch(closeModal());
  };

  useEffect(() => {
    if (isSuccess) dispatch(closeModal());
  }, [isSuccess]);

  return (
    <ModalWrapper isShow={isShow && type.includes("confirm-update")}>
      <div
        className={`
  ${
    isShow && type.includes("confirm-update")
      ? "top-40 transform scale-100"
      : "top-40 transform scale-50 "
  } max-w-3xl 
   fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
        <div className='px-3 py-6 space-y-4 text-center bg-white md:rounded-lg'>
          <p>
            آیا موافق بروزرسانی{" "}
            <span className='font-bold text-green-500'>{title}</span> تغییر داده
            شده هستید؟
          </p>
          <div className='flex justify-center gap-x-20'>
            <button
              type='button'
              className='bg-green-500 rounded-lg btn'
              onClick={handleConfirmClick}
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "بروزرسانی و ادامه"}
            </button>
            <button
              type='button'
              className='rounded-lg btn'
              onClick={handleCancleClick}
            >
              لغو
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
