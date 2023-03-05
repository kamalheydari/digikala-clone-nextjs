import Image from 'next/image'
import { useRouter } from 'next/router'

import { Button, Modal } from 'components'

export default function RedirectToLogin(props) {
  //? Props
  const { isShow, onClose, title, text } = props
  const router = useRouter()

  //? Handlers
  const handleClick = () => {
    router.push('/login')

    onClose()
  }

  return (
    <Modal isShow={isShow} onClose={onClose} effect='ease-out'>
      <Modal.Content>
        <Modal.Body>
          <div className='p-3 space-y-4 text-center bg-white md:rounded-lg'>
            <div className='relative w-20 h-20 mx-auto'>
              <Image src='/icons/exclamation.svg' layout='fill' alt='!' />
            </div>
            <p className='text-xl font-bold'>{title}</p>
            <p className='text-red-600'>{text}</p>
            <Button className='mx-auto' onClick={handleClick}>
              انتقال به صفحه ورود
            </Button>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
