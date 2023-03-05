import Link from 'next/link'

import { Icons, BoxLink, Logout, Logo } from 'components'

export default function ProfileAside() {
  const profilePaths = [
    {
      name: 'محصول جدید',
      icon: <Icons.Plus className='text-black icon' />,
      path: '/admin/product',
    },
    {
      name: 'محصولات',
      icon: <Icons.Save className='text-black icon' />,
      path: '/admin/products',
    },
    {
      name: 'سفارشات',
      icon: <Icons.Bag className='text-black icon' />,
      path: '/admin/orders',
    },
    {
      name: 'دسته بندی ها',
      icon: <Icons.Category className='text-black icon' />,
      path: '/admin/categories',
    },
    {
      name: 'مشخصات دسته بندی ها',
      icon: <Icons.Location className='text-black icon' />,
      path: '/admin/details',
    },
    {
      name: 'کاربران',
      icon: <Icons.Users className='text-black icon' />,
      path: '/admin/users',
    },
    {
      name: 'دیدگاه‌ها',
      icon: <Icons.Comment className='text-black icon' />,
      path: '/admin/reviews',
    },
  ]

  return (
    <aside className='sticky mt-6 lg:border lg:border-gray-200 lg:rounded-md lg:py-4 min-w-max top-6'>
      <Link passHref href='/'>
        <a>
          <Logo className='w-40 h-12 mx-auto' />
        </a>
      </Link>

      <div className='mt-4'>
        {profilePaths.map((item, index) => (
          <BoxLink key={index} path={item.path} name={item.name}>
            {item.icon}
          </BoxLink>
        ))}
        <Logout />
      </div>
    </aside>
  )
}
