import React, { useEffect } from 'react'
import Icons from './Icons'

interface ModalProps {
  isShow: boolean
  onClose: () => void
  effect: 'bottom-to-top' | 'ease-out' | 'buttom-to-fit'
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = (props) => {
  //? Porps
  const { isShow, onClose, effect, children } = props

  //? Re-Renders
  useEffect(() => {
    if (isShow) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isShow])

  //? Styles
  const effectClasses =
    effect === 'bottom-to-top'
      ? `
  ${
    isShow ? 'bottom-0 lg:top-20' : '-bottom-full lg:top-60'
  } w-full h-full lg:h-fit lg:max-w-3xl 
   fixed transition-all duration-700 left-0 right-0 mx-auto`
      : effect === 'ease-out'
      ? `
  ${
    isShow ? 'top-40 transform scale-100' : 'top-40 transform scale-50 '
  } max-w-3xl 
   fixed transition-all duration-700 left-0 right-0 mx-auto`
      : effect === 'buttom-to-fit'
      ? `
  ${isShow ? 'bottom-0' : '-bottom-full'} w-full h-fit lg:max-w-3xl 
   fixed transition-all duration-700 left-0 right-0 mx-auto`
      : ''

  //? Render(s)
  return (
    <div
      className={`${
        isShow ? 'opacity-100 visible' : 'opacity-0 invisible '
      } transition-all duration-500 fixed inset-0 z-50`}
    >
      <div className='w-screen h-screen bg-gray-400/20' onClick={onClose} />
      <div className={effectClasses}>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<ContentProps>, {
                onClose,
              })
            : child
        )}
      </div>
    </div>
  )
}

interface ContentProps {
  onClose: () => void
  children: React.ReactNode
  className?: string
}
const Content: React.FC<ContentProps> = (props) => {
  //? Props
  const { onClose, children, ...restProps } = props

  //? Render(s)
  return (
    <div {...restProps}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<ContentProps>, {
              onClose,
            })
          : child
      )}
    </div>
  )
}

interface HeaderProps {
  onClose: () => void
  children: React.ReactNode
}

const Header: React.FC<HeaderProps> = (props) => {
  //? Props
  const { onClose, children } = props

  //? Render(s)
  return (
    <div className='flex items-center justify-between pb-2 border-b-2 border-gray-200'>
      <span className='text-sm'>{children}</span>
      <button onClick={onClose} className='p-1'>
        <Icons.Close className='icon' />
      </button>
    </div>
  )
}

interface BodyProps {
  children: React.ReactNode
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <>{children}</>
}

const _default = Object.assign(Modal, {
  Modal,
  Content,
  Header,
  Body,
})

export default _default
