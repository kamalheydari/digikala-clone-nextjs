import type { IPagination, IProduct, IProductForm, QueryParams } from 'types'

export type MsgResult = { msg: string }
export type IdQuery = { id: string }
export type GetProductsResult = {
  products: IProduct[]
  productsLength: number
  mainMaxPrice: number
  mainMinPrice: number
  pagination: IPagination
}
export type GetProductsQuery = QueryParams
export type GetSingleProductResult = IProduct
export type CreateProductQuery = { body: IProductForm }
export type UpdateProductQuery = { body: IProduct; id: string }
