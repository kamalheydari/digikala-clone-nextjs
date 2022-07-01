import {
  closeModal,
  confirmAction,
  confirmReset,
  openModal,
} from "app/slices/modalSlice";
import { useEffect } from "react";
import { useDeleteDataMutation } from "app/slices/fetchApiSlice";

import { resetDetails } from "app/slices/detailsSlice";
import { useRouter } from "next/router";

export default function ConfirmDeleteModal({
  title,
  isConfirm,
  id,
  token,
  type,
  dispatch,
}) {
  const router = useRouter();

  //? Config Url & Edit Store
  let url, ifIsSucces;

  if (type === "confirm-delete-user") {
    url = `/api/user/${id}`;
    ifIsSucces = () => {
      router.reload();
    };
  } else if (type === "confirm-delete-details") {
    url = `/api/details/${id}`;
    ifIsSucces = () => {
      dispatch(resetDetails());
    };
  } else if (type === "confirm-delete-product") {
    url = `/api/products/${id}`;
    ifIsSucces = () => {
      router.reload();
    };
  }

  //? Delete Data
  const [deleteData, { isSuccess, isError, error }] = useDeleteDataMutation();

  useEffect(() => {
    if (isConfirm) {
      deleteData({
        url,
        token,
      });
    }
    if (isSuccess) {
      ifIsSucces();
      dispatch(confirmReset());
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
        آیا موافق حذف <span className='font-bold text-red-500'>{title}</span>{" "}
        انتخاب شده هستید؟
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
  );
}
