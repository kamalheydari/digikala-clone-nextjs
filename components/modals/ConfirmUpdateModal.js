import { Button, Modal } from 'components'

export default function ConfirmUpdateModal(props) {
  //? Props
  const {
    title,
    updateFunc,
    isLoading,
    isShow,
    onClose,
    updateInfo,
    setUpdateInfo,
  } = props

  //? Handlers
  const handleConfirmClick = () => {
    updateFunc({
      id: updateInfo.id,
      body: { ...updateInfo.editedData },
    })
  }

  const handleCancleClick = () => {
    setUpdateInfo({ id: '', editedData: {} })
    onClose()
  }

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect='ease-out'>
      <Modal.Content>
        <Modal.Body>
          <div className='px-3 py-6 space-y-4 text-center bg-white md:rounded-lg'>
            <p>
              آیا موافق بروزرسانی{' '}
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
  )
}
