import moment from 'moment-jalaali'

import { HandleResponse, ResponsiveImage } from 'components'

import { formatNumber } from 'utils'

import { useUpdateOrderMutation } from 'services'
import { IOrder } from 'types'
import { Check, Clock2, More, Toman } from 'icons'

interface Props {
  order: IOrder
  singleOrder?: boolean
}

const OrderCard: React.FC<Props> = (props) => {
  // ? Props
  const { order, singleOrder } = props

  // ? Edit Order Query
  const [editOrder, { data, isSuccess, isError, error }] = useUpdateOrderMutation()

  // ? Handlers
  const handleChangeToDelivered = () => {
    editOrder({
      id: order._id,
      body: { paid: true, delivered: true },
    })
  }
  const handleChangeToInProccess = () => {
    editOrder({
      id: order._id,
      body: { paid: false, delivered: false },
    })
  }

  // ? Render(s)
  return (
    <>
      {/* Handle Edit Order Response */}
      {(isSuccess || isError) && (
        <HandleResponse isError={isError} isSuccess={isSuccess} error={error} message={data?.msg} />
      )}
      <div className="space-y-3 border-b border-gray-300 py-4 lg:rounded-lg lg:border ">
        <div className="flex items-center justify-between lg:px-3">
          <div className="flex items-center gap-x-2 ">
            {order.delivered ? (
              <Check className="h-6 w-6 rounded-full bg-lime-600 p-0.5 text-white" />
            ) : (
              <Clock2 className="h-6 w-6 rounded-full bg-amber-600 p-0.5 text-white" />
            )}
            <span className="text-sm text-black">{order.delivered ? 'تحویل شده' : 'در حال پردازش'}</span>
          </div>
          {order.delivered && <span className="farsi-digits">{moment(order.updatedAt).format('jYYYY/jM/jD')}</span>}
          {singleOrder && (
            <div className="group relative h-fit self-end px-1.5">
              <More className="icon cursor-pointer" />
              <div className="absolute left-0 top-5 z-10 hidden rounded bg-white px-4 py-3 shadow-4xl group-hover:flex">
                <div className="space-y-4">
                  <button
                    type="button"
                    className="flex w-48 items-center gap-x-3 lg:w-56"
                    onClick={handleChangeToDelivered}
                    disabled={order.delivered}
                  >
                    <Check className="icon rounded-full bg-green-600 p-0.5 text-white " />
                    <span className="block">تغییر وضعیت به تحویل شده</span>
                  </button>
                  <button
                    type="button"
                    className="flex w-48 items-center gap-x-3 lg:w-56"
                    onClick={handleChangeToInProccess}
                    disabled={!order.delivered}
                  >
                    <Clock2 className="icon rounded-full bg-amber-600 p-0.5 text-white " />
                    <span className="block">تغییر وضعیت به در حال پردازش</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-between lg:px-3">
          <div>
            <span>کد سفارش</span>
            <span className="mr-2 text-sm text-black">{order._id}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <span className="farsi-digits text-black">{formatNumber(order.totalPrice - order.totalDiscount)}</span>
            <Toman className="h-6 w-6" />
          </div>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-3 py-5 lg:border-t lg:border-gray-300 lg:px-3">
          {order.cart.map((cartItem) => (
            <ResponsiveImage
              key={cartItem.itemID}
              dimensions="w-16 h-16"
              src={cartItem.img.url}
              blurDataURL={cartItem.img.placeholder}
              alt={cartItem.name}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default OrderCard
