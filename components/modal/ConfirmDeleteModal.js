import {
  closeModal,
  confirmDeleteAction,
  confirmReset,
} from "app/slices/modal.slice";

import { Button, ModalWrapper } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ConfirmDeleteModal({ isLoading, isSuccess }) {
  const dispatch = useDispatch();

  //? Store
  const { isShow, title, type } = useSelector((state) => state.modal);

  //? Handlers
  const handleConfirmClick = () => {
    dispatch(confirmDeleteAction());
  };

  const handleCancleClick = () => {
    dispatch(confirmReset());
    dispatch(closeModal());
  };

  useEffect(() => {
    if (isSuccess) dispatch(closeModal());
  }, [isSuccess]);

  return (
    <ModalWrapper isShow={isShow && type.includes("confirm-delete")}>
      <div
        className={`
  ${
    isShow && type.includes("confirm-delete")
      ? "top-40 transform scale-100"
      : "top-40 transform scale-50 "
  } max-w-3xl 
   fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
        <div className='px-3 py-6 space-y-4 text-center bg-white md:rounded-lg'>
          <p>
            آیا موافق حذف{" "}
            <span className='font-bold text-red-500'>{title}</span> انتخاب شده
            هستید؟
          </p>
          <div className='flex justify-center gap-x-20'>
            <Button onClick={handleConfirmClick} isLoading={isLoading}>
              حذف و ادامه
            </Button>

            <Button className='!bg-green-500' onClick={handleCancleClick}>
              لغو
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
