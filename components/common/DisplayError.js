import { Transition } from '@headlessui/react'
import Icons from './Icons'

export default function DisplayError({ errors }) {
  return (
    <div className='min-h-[29px]'>
      <Transition
        show={!!errors}
        enter='transition-opacity duration-150'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-10'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='display-error'>
          {errors && <Icons.Exclamation />}
          <span>{errors?.message}</span>
        </div>
      </Transition>
    </div>
  )
}
