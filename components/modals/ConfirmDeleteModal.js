import { useEffect } from "react";

import { showAlert } from "app/slices/alert.slice";
import { useDispatch } from "react-redux";

import { Button, Modal } from "components";

export default function ConfirmDeleteModal(props) {
  //? Props
  const {
    title,
    deleteFunc,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    isShow,
    onClose,
    deleteInfo,
    setDeleteInfo,
  } = props;

  const dispatch = useDispatch();

  //? Send Request
  useEffect(() => {
    if (deleteInfo.isConfirmDelete) {
      deleteFunc({
        id: deleteInfo.id,
      });
    }
  }, [deleteInfo.isConfirmDelete]);

  //? Handlers
  const handleConfirmClick = () => {
    setDeleteInfo({ ...deleteInfo, isConfirmDelete: true });
  };

  const handleCancleClick = () => {
    setDeleteInfo({ id: "", isConfirmDelete: false });
    onClose();
  };

  //? Re-Renders
  useEffect(() => {
    if (isSuccess) {
      onClose();
      setDeleteInfo({ id: "", isConfirmDelete: false });

      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      onClose();
      setDeleteInfo({ id: "", isConfirmDelete: false });

      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
    }
  }, [isError]);

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect='ease-out'>
      <Modal.Content>
        <Modal.Body>
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
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
