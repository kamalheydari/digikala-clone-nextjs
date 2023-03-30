import Link from 'next/link'

import { Icons, BoxLink, Logout, Logo } from 'components'

export default function ProfileAside() {
  const profilePaths = [
    {
      name: 'محصول جدید',
      Icon: Icons.Plus,
      path: '/admin/products/create',
    },
    {
      name: 'محصولات',
      Icon: Icons.Save,
      path: '/admin/products',
    },
    {
      name: 'سفارشات',
      Icon: Icons.Bag,
      path: '/admin/orders',
    },
    {
      name: 'دسته بندی ها',
      Icon: Icons.Category,
      path: '/admin/categories',
    },
    {
      name: 'مشخصات دسته بندی ها',
      Icon: Icons.Location,
      path: '/admin/details',
    },
    {
      name: 'کاربران',
      Icon: Icons.Users,
      path: '/admin/users',
    },
    {
      name: 'دیدگاه‌ها',
      Icon: Icons.Comment,
      path: '/admin/reviews',
    },
    {
      name: 'اسلایدرها',
      Icon: Icons.Slider,
      path: '/admin/sliders',
    },
    {
      name: 'بنرها',
      Icon: Icons.Image,
      path: '/admin/banners',
    },
  ]

  //? Render(s)
  return (
    <aside className='sticky mt-6 lg:border lg:border-gray-200 lg:rounded-md lg:pt-4 min-w-max top-6'>
      <Link passHref href='/admin'>
        <Logo className='w-40 h-12 mx-auto' />
      </Link>

      <div className='mt-4'>
        {profilePaths.map((item, index) => (
          <BoxLink key={index} path={item.path} name={item.name}>
            <item.Icon className='icon text-black' />
          </BoxLink>
        ))}
        <Logout />
      </div>
    </aside>
  )
}
