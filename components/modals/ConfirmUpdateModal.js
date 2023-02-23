import { useEffect } from "react";

import { Button, HandleResponse, Modal } from "components";

export default function ConfirmUpdateModal(props) {
  //? Props
  const {
    title,
    updateFunc,
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    isShow,
    onClose,
    updateInfo,
    setUpdateInfo,
  } = props;

  //? Send Request
  useEffect(() => {
    if (updateInfo.isConfirmUpdate) {
      updateFunc({
        id: updateInfo.id,
        body: { ...updateInfo.editedData },
      });
    }
  }, [updateInfo.isConfirmUpdate]);

  //? Handlers
  const handleConfirmClick = () => {
    setUpdateInfo({ ...updateInfo, isConfirmUpdate: true });
  };

  const handleCancleClick = () => {
    setUpdateInfo({ id: "", isConfirmUpdate: false, editedData: {} });
    onClose();
  };

  return (
    <>
      {/* Handle Update Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.err}
          message={data?.msg}
          onSuccess={() => {
            setUpdateInfo({ id: "", isConfirmUpdate: false, editedData: {} });
            onClose();
          }}
          onError={() => {
            setUpdateInfo({ id: "", isConfirmUpdate: false, editedData: {} });
            onClose();
          }}
        />
      )}
      <Modal isShow={isShow} onClose={onClose} effect='ease-out'>
        <Modal.Content>
          <Modal.Body>
            <div className='px-3 py-6 space-y-4 text-center bg-white md:rounded-lg'>
              <p>
                آیا موافق بروزرسانی{" "}
                <span className='font-bold text-green-500'>{title}</span> تغییر
                داده شده هستید؟
              </p>
              <div className='flex justify-center gap-x-20'>
                <Button onClick={handleConfirmClick} isLoading={isLoading}>
                  بروزرسانی و ادامه
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
