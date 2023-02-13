import { Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";

import { Icons, Logout } from "components";
import Link from "next/link";
import Image from "next/image";

export default function UserDropdown({ name }) {
  return (
    <Menu as='div' className='user-dropdown'>
      <Menu.Button className='user-dropdown__button'>
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
        <Menu.Items className='user-dropdown__items'>
          <Menu.Item>
            <div className='user-dropdown__item'>
              <Link href='/profile'>
                <a className='user-dropdown__item__anchor'>
                  <Image
                    src='/icons/person.svg'
                    height={24}
                    width={24}
                    alt='کاربر'
                  />
                  <span>{name}</span>
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
  );
}
