import { Modal, Button } from '@/components/ui'

interface Props {
  title: string
  isLoading: boolean
  isShow: boolean
  onClose: () => void
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmUpdateModal: React.FC<Props> = (props) => {
  // ? Props
  const { title, isLoading, isShow, onClose, onConfirm, onCancel } = props

  // ? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect="ease-out">
      <Modal.Content onClose={onClose}>
        <Modal.Body>
          <div className="space-y-4 bg-white px-3 py-6 text-center md:rounded-lg">
            <p>
              آیا موافق بروزرسانی <span className="font-bold text-green-500">{title}</span> تغییر داده شده هستید؟
            </p>
            <div className="flex justify-center gap-x-20">
              <Button onClick={onConfirm} isLoading={isLoading}>
                بروزرسانی و ادامه
              </Button>

              <Button className="!bg-green-500" onClick={onCancel}>
                لغو
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}

export default ConfirmUpdateModal
