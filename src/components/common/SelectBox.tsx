/* eslint-disable tailwindcss/migration-from-tailwind-2 */
import { Fragment } from 'react'

import { Listbox, Transition } from '@headlessui/react'
import { HiCheck, HiChevronDown } from 'react-icons/hi'

interface BaseOption {
  _id: string
  name: string
}

interface Props<T extends BaseOption> {
  list: T[]
  placeholder: string
  onChange: (option: T) => void
  value: T | undefined
}

export default function SelectBox<T extends BaseOption>(props: Props<T>) {
  // ? Props
  const { list, placeholder, onChange, value } = props

  // ? Render(s)
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative mt-1 w-64">
        <Listbox.Button className="relative h-8 w-full cursor-default overflow-hidden rounded-lg border border-gray-200 bg-white text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          {value?.name ? (
            <span className="block truncate">{value.name}</span>
          ) : (
            <span className="block truncate ">{placeholder}</span>
          )}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute z-40 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {list?.map((item, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={item}
              >
                <span className={`block truncate ${value?._id === item._id ? 'font-bold' : 'font-normal'}`}>
                  {item.name}
                </span>
                {value?._id === item._id ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                    <HiCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
