import {
  closeModal,
  confirmAction,
  confirmReset,
  openModal,
} from "app/slices/modalSlice";
import { useEffect } from "react";
import { usePutDataMutation } from "app/slices/fetchApiSlice";

export default function ConfirmUpdateModal({
  title,
  isConfirm,
  id,
  token,
  type,
  dispatch,
  editedData,
}) {
  //? Config Url & Edit Store
  let url;

  if (type === "confirm-update-details") {
    url = `/api/details/${id}`;
  }
  //? Update Data
  const [putData, {data, isSuccess, isError, error }] = usePutDataMutation();
  useEffect(() => {
    if (isConfirm) {
      putData({
        url,
        token,
        body: {...editedData},
      });
    }
    if (isSuccess) {
      dispatch(confirmReset());
      openModal({
        isShow: true,
        type: "alert",
        status: "success",
        text: data.msg,
      })
    }

    if (isError) {
      dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "error",
          text: error?.data.err,
        })
      );
      dispatch(confirmReset());
    }
  }, [isConfirm, isSuccess, isError]);

  //? Handlers
  const handleConfirmClick = () => {
    dispatch(confirmAction());
    dispatch(closeModal());
  };

  const handleCancleClick = () => {
    dispatch(closeModal());
  };

  return (
    <div className='px-3 py-6 space-y-4 text-center bg-white md:rounded-lg'>
      <p className='text-gray-600'>
        آیا موافق بروزرسانی{" "}
        <span className='font-bold text-green-500'>{title}</span> تغییر داده شده
        هستید؟
      </p>
      <div className='flex justify-center gap-x-20'>
        <button
          type='button'
          className='rounded-lg btn bg-green-500'
          onClick={handleConfirmClick}
        >
          بروزرسانی و ادامه
        </button>
        <button
          type='button'
          className=' rounded-lg btn'
          onClick={handleCancleClick}
        >
          لغو
        </button>
      </div>
    </div>
  );
}
