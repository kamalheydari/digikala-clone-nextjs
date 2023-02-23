import { useEffect } from "react";

import { Button, HandleResponse, Modal } from "components";

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

  //? Render(s)
  return (
    <>
      {/* Handle Delete Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.err}
          message={data?.msg}
          onSuccess={() => {
            onClose();
            setDeleteInfo({ id: "", isConfirmDelete: false });
          }}
          onError={() => {
            onClose();
            setDeleteInfo({ id: "", isConfirmDelete: false });
          }}
        />
      )}

      <Modal isShow={isShow} onClose={onClose} effect='ease-out'>
        <Modal.Content>
          <Modal.Body>
            <div className='px-3 py-6 space-y-4 text-center bg-white md:rounded-lg'>
              <p>
                آیا موافق حذف{" "}
                <span className='font-bold text-red-500'>{title}</span> انتخاب
                شده هستید؟
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
    </>
  );
}
