import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'

import { Icons, Logout, Person } from 'components'
import Link from 'next/link'

export default function UserDropdown({ name }) {
  return (
    <Menu as='div' className='dropdown'>
      <Menu.Button className='dropdown__button'>
        <Icons.User className='icon' />
        <Icons.ArrowDown className='icon' />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='dropdown__items w-56'>
          <Menu.Item>
            <div className='transition-colors hover:bg-gray-100 px-3'>
              <Link href='/profile'>
                <a className='flex-center py-4 mx-4 text-xs font-medium text-gray-700  gap-x-1 md:text-sm'>
                  <Person className='h-6 w-6' />
                  <span className='ml-auto mr-4 text-gray-700'>{name}</span>
                  <Icons.ArrowLeft className='text-gray-700 icon lg:mr-3' />
                </a>
              </Link>
            </div>
          </Menu.Item>

          <Menu.Item>
            <Logout />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
