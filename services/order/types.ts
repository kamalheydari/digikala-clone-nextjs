import type { IOrder, IPagination } from 'types'

export type MsgResult = { msg: string }
export type IdQuery = { id: string }
export type GetOrdersResult = {
  orders: IOrder[]
  ordersLength: number
  pagination: IPagination
}
export type GetOrdersQuery = { page: number; pageSize: number }
export type GetSingleOrderResult = { order: IOrder }
export type UpdateOrderQuery = { id: string; body: Partial<IOrder> }
export type CreateOrderQuery = { body: Partial<IOrder> }
