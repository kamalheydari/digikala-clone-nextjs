import { EditIconButton } from 'components/common/IconBtns'
import Link from 'next/link'

import type { IOrder } from 'types'

interface Props {
  orders: IOrder[]
}

const OrdersTable: React.FC<Props> = (props) => {
  // ? Props
  const { orders } = props

  // ? Render(s)
  return (
    <div className="mt-7 overflow-x-auto">
      <table className="w-full whitespace-nowrap">
        <thead className="h-9 bg-emerald-200">
          <tr className="text-emerald-600">
            <th className="border-x-2 border-gray-300">ID</th>
            <th>نام گیرنده</th>
            <th>وضعیت</th>
            <th className="border-x-2 border-gray-300">ایمیل</th>
            <th>تغییر وضعیت</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {orders.length > 0 &&
            orders.map((order) => (
              <tr
                className="border-b border-gray-300 text-center text-xs transition-colors hover:bg-gray-300/80 md:text-sm"
                key={order._id}
              >
                <td className="px-1.5 py-3">{order._id}</td>
                <td className="px-1.5 py-3">{order.user.name}</td>
                <td className="px-1.5 py-3">
                  {order.delivered ? (
                    <span className="inline-block rounded-md bg-green-200 p-1 text-green-700">تحویل داده شده</span>
                  ) : (
                    <span className="rounded-md bg-amber-100 p-1 text-amber-700">در حال پردازش</span>
                  )}
                </td>
                <td className="px-1.5 py-3">{order.user.email}</td>
                <td className="p-2">
                  <Link href={`/admin/orders/${order._id}`}>
                    <EditIconButton />
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersTable
