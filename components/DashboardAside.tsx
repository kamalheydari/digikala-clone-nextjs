import Link from 'next/link'

import { BoxLink, Logout } from 'components'
import { Bag, Category, Comment, Image, Location, Logo, Plus, Save, Slider, Users } from 'icons'

const profilePaths = [
  {
    name: 'محصول جدید',
    Icon: Plus,
    path: '/admin/products/create',
  },
  {
    name: 'محصولات',
    Icon: Save,
    path: '/admin/products',
  },
  {
    name: 'سفارشات',
    Icon: Bag,
    path: '/admin/orders',
  },
  {
    name: 'دسته بندی ها',
    Icon: Category,
    path: '/admin/categories',
  },
  {
    name: 'مشخصات دسته بندی ها',
    Icon: Location,
    path: '/admin/details',
  },
  {
    name: 'کاربران',
    Icon: Users,
    path: '/admin/users',
  },
  {
    name: 'دیدگاه‌ها',
    Icon: Comment,
    path: '/admin/reviews',
  },
  {
    name: 'اسلایدرها',
    Icon: Slider,
    path: '/admin/sliders',
  },
  {
    name: 'بنرها',
    Icon: Image,
    path: '/admin/banners',
  },
]

export default function ProfileAside() {
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
