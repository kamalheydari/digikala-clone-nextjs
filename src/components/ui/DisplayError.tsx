import { FieldError } from 'react-hook-form'

import { Transition } from '@headlessui/react'
import { Exclamation } from '@/icons'

interface Props {
  errors: FieldError | undefined
}

const DisplayError: React.FC<Props> = (props) => {
  // ? Props
  const { errors } = props

  // ? Render(s)
  return (
    <div className="min-h-[29px]">
      <Transition
        show={!!errors}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-10"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mt-1.5 inline-flex min-w-max gap-x-1 text-sm ">
          {errors && <Exclamation className="text-red-600" />}
          <span className="text-red-600">{errors?.message}</span>
        </div>
      </Transition>
    </div>
  )
}

export default DisplayError
