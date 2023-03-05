import { Fragment, useState } from 'react'
import { Combobox as HUICombobox, Transition } from '@headlessui/react'
import { HiCheck, HiChevronDown } from 'react-icons/hi'
import { useController } from 'react-hook-form'

export default function Combobox({ list, name, control, placeholder }) {
  const { field } = useController({ name, control })

  const [query, setQuery] = useState('')

  const filteredList =
    query === ''
      ? list
      : list.filter((item) => {
          return item.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <HUICombobox
      value={field.value}
      name={field.name}
      onBlur={field.onBlur}
      onChange={field.onChange}
    >
      <div className='combobox'>
        <div className='combobox__header'>
          <HUICombobox.Input
            className='combobox__input'
            displayValue={(item) => item.name}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            autoComplete='off'
          />
          <HUICombobox.Button className='combobox__button'>
            <HiChevronDown className='icon' aria-hidden='true' />
          </HUICombobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={() => setQuery('')}
        >
          <HUICombobox.Options className='combobox__options'>
            {filteredList.length === 0 && query !== '' ? (
              <div className='combobox__not-found'>هیچ موردی پیدا نشد!</div>
            ) : (
              filteredList.map((item) => (
                <HUICombobox.Option
                  key={item.id}
                  className={`combobox__option
                  ${field.value.id === item.id ? 'bg-teal-50' : ''}
                  `}
                  value={item}
                >
                  {({ active }) => (
                    <>
                      <span
                        className={`block truncate lg:text-sm ${
                          field.value.id === item.id
                            ? 'font-semibold'
                            : 'font-normal'
                        }`}
                      >
                        {item.name}
                      </span>
                      {field.value.id === item.id ? (
                        <span
                          className={`combobox__option--active-icon  ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <HiCheck
                            className='icon text-teal-600'
                            aria-hidden='true'
                          />
                        </span>
                      ) : null}
                    </>
                  )}
                </HUICombobox.Option>
              ))
            )}
          </HUICombobox.Options>
        </Transition>
      </div>
    </HUICombobox>
  )
}
