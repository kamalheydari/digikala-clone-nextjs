import React, { useEffect } from 'react'
import Icons from './Icons'

const Modal = (props) => {
  const { isShow, onClose, effect, children } = props

  useEffect(() => {
    if (isShow) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [isShow])

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
      : ''

  return (
    <div
      className={`${
        isShow ? 'opacity-100 visible' : 'opacity-0 invisible '
      } transition-all duration-500 fixed inset-0 z-50`}
    >
      <div className='w-screen h-screen bg-gray-400/20' onClick={onClose} />
      <div className={effectClasses}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { onClose })
          }

          return child
        })}
      </div>
    </div>
  )
}

const Content = ({ onClose, children, ...restProps }) => {
  return (
    <div {...restProps}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { onClose })
        }

        return child
      })}
    </div>
  )
}

const Header = ({ onClose, children }) => {
  return (
    <div className='flex justify-between pb-2 border-b-2 border-gray-200'>
      <span className='text-sm'>{children}</span>
      <button onClick={onClose} className='p-1'>
        <Icons.Close className='icon' />
      </button>
    </div>
  )
}
const Body = ({ children }) => {
  return <>{children}</>
}

const _default = Object.assign(Modal, {
  Modal,
  Content,
  Header,
  Body,
})

export default _default
