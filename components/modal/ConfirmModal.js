import {
  closeModal,
  confirmAction,
  confirmReset,
  openModal,
} from "app/slices/modalSlice";
import { useEffect } from "react";
import { useDeleteDataMutation } from "app/slices/fetchApiSlice";
import { deleteUser } from "app/slices/usersSlice";

export default function ConfirmModal({
  title,
  isConfirm,
  id,
  token,
  type,
  dispatch,
}) {
  //? Config Url & Edit Store
  let url, editStore;
  if (type === "confirm-user") {
    url = `/api/user/${id}`;
    editStore = () => {
      dispatch(deleteUser(id));
    };
  } else if (type === "confirm-post") {
    url = `/api/category/${id}`;
    editStore = () => {};
  } else if (type === "confirm-category") {
    url = `/api/products/${id}`;
    editStore = () => {};
  }

  //? Delete Data
  const [
    deleteData,
    { data, isSuccess, isError, error },
  ] = useDeleteDataMutation();

  useEffect(() => {
    if (isConfirm) {
      deleteData({
        url,
        token,
      });
    }
    if (isSuccess) {
      editStore();
      dispatch(confirmReset());
      openModal({
        isShow: true,
        type: "alert",
        status: "success",
        text: data.msg,
      });
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
    }
  }, [isConfirm, isSuccess, isError]);

  //? Handlers
  const handleConfirmClick = (data) => {
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
