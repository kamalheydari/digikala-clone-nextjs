import Link from 'next/link'

import { Bag, Category, Comment, Image, Location, Logo, Plus, Save, Slider, Users } from '@/icons'
import { BoxLink } from '@/components/ui'
import { LogoutButton } from '@/components/user'

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

export default function DashboardAdminAside() {
  // ? Render(s)
  return (
    <aside className="sticky top-6 mt-6 min-w-max lg:rounded-md lg:border lg:border-gray-200 lg:pt-4">
      <Link passHref href="/admin">
        <Logo className="mx-auto h-12 w-40" />
      </Link>

      <div className="mt-4">
        {profilePaths.map((item, index) => (
          <BoxLink key={index} path={item.path} name={item.name}>
            <item.Icon className="icon text-black" />
          </BoxLink>
        ))}
        <LogoutButton />
      </div>
    </aside>
  )
}
