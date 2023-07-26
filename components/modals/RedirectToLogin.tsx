import Image from 'next/image'
import { useRouter } from 'next/router'

import { Button, Modal } from 'components'

interface Props {
  isShow: boolean
  onClose: () => void
  title: string
  text: string
}

const RedirectToLogin: React.FC<Props> = (props) => {
  //? Props
  const { isShow, onClose, title, text } = props
  const { push, asPath } = useRouter()

  //? Handlers
  const handleClick = () => {
    push(`/authentication/login?redirectTo=${asPath}`)

    onClose()
  }

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect='ease-out'>
      <Modal.Content onClose={onClose}>
        <Modal.Body>
          <div className='p-3 space-y-4 text-center bg-white md:rounded-lg'>
            <Image
              className='mx-auto'
              src='/icons/exclamation.svg'
              height={80}
              width={80}
              alt='!'
            />
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

export default RedirectToLogin
