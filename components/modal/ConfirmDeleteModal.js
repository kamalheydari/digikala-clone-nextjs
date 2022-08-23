import { useEffect } from "react";

import {
  closeModal,
  confirmAction,
  confirmReset,
} from "app/slices/modal.slice";
import { showAlert } from "app/slices/alert.slice";
import { useDeleteDataMutation } from "app/slices/fetchApi.slice";
import { resetDetails } from "app/slices/details.slice";

import { ModalWrapper } from "components";

export default function ConfirmDeleteModal({
  title,
  isConfirm,
  id,
  token,
  type,
  dispatch,
  isShow,
}) {
  //? Config Url & Edit Store
  let url, successAction;

  if (type === "confirm-delete-user") {
    url = `/api/user/${id}`;
    successAction = () => {
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
    };
  } else if (type === "confirm-delete-details") {
    url = `/api/details/${id}`;
    successAction = () => {
      dispatch(resetDetails());
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
    };
  } else if (type === "confirm-delete-product") {
    url = `/api/products/${id}`;
    successAction = () => {
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
    };
  } else if (type === "confirm-delete-reveiw") {
    url = `/api/reviews/${id}`;
    successAction = () => {
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
    };
  }

  //? Delete Data
  const [
    deleteData,
    { isSuccess, isError, error, data },
  ] = useDeleteDataMutation();

  useEffect(() => {
    if (isConfirm && url) {
      deleteData({
        url,
        token,
      });
      dispatch(confirmReset());
    }
  }, [isConfirm]);

  useEffect(() => {
    if (isSuccess) {
      successAction();
      dispatch(confirmReset());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
      dispatch(confirmReset());
    }
  }, [isError]);

  //? Handlers
  const handleConfirmClick = () => {
    dispatch(confirmAction());
    dispatch(closeModal());
  };

  const handleCancleClick = () => {
    dispatch(closeModal());
  };

  return (
    <ModalWrapper isShow={isShow}>
      <div
        className={`
  ${
    isShow ? "top-40 transform scale-100" : "top-40 transform scale-50 "
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
            <button
              type='button'
              className='rounded-lg btn'
              onClick={handleConfirmClick}
            >
              حذف و ادامه
            </button>
            <button
              type='button'
              className='bg-green-500 rounded-lg btn'
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
