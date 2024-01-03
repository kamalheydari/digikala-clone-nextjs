import Link from 'next/link'
import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'

import { Logout } from 'components'
import { ArrowDown, ArrowLeft, Person, User } from 'icons'

interface Props {
  name: string
}

const UserDropdown: React.FC<Props> = (props) => {
  // ? Props
  const { name } = props

  // ? Render(s)
  return (
    <Menu as="div" className="dropdown">
      <Menu.Button className="dropdown__button">
        <User className="icon" />
        <ArrowDown className="icon" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="dropdown__items w-56">
          <Menu.Item>
            <div className="px-3 transition-colors hover:bg-gray-100">
              <Link
                href="/profile"
                className="flex-center mx-4 gap-x-1 py-4 text-xs font-medium text-gray-700 md:text-sm"
              >
                <Person className="h-6 w-6" />
                <span className="ml-auto mr-4 text-gray-700">{name}</span>
                <ArrowLeft className="icon text-gray-700 lg:mr-3" />
              </Link>
            </div>
          </Menu.Item>

          <Logout />
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserDropdown
