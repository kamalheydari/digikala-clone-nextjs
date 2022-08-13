import { useEffect } from "react";

import {
  closeModal,
  confirmAction,
  confirmReset,
} from "app/slices/modal.slice";
import { usePutDataMutation } from "app/slices/fetchApi.slice";
import { showAlert } from "app/slices/alert.slice";

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
  } else if (type === "confirm-update-product") {
    url = `/api/products/${id}`;
  } else if (type === "confirm-update-order") {
    url = `/api/order/delivered/${id}`;
  }
  //? Update Data
  const [putData, { data, isSuccess, isError, error }] = usePutDataMutation();
  useEffect(() => {
    if (isConfirm) {
      putData({
        url,
        token,
        body: { ...editedData },
      });
    }
  }, [isConfirm]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
      dispatch(confirmReset());
    }

    if (isError) {
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
      dispatch(confirmReset());
    }
  }, [isSuccess, isError]);

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
      <p>
        آیا موافق بروزرسانی{" "}
        <span className='font-bold text-green-500'>{title}</span> تغییر داده شده
        هستید؟
      </p>
      <div className='flex justify-center gap-x-20'>
        <button
          type='button'
          className='bg-green-500 rounded-lg btn'
          onClick={handleConfirmClick}
        >
          بروزرسانی و ادامه
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
  );
}
