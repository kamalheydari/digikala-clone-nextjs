import type { IDetails, IDetailsForm } from 'types'

export type MsgResult = { msg: string }
export type IdQuery = { id: string }
export type GetDetailsResult = IDetails
export type CreateDetailsQuery = { body: IDetailsForm }
export type UpdateDetailsResult = { msg: string; category_id: string }
export type UpdateDetailsQuery = { id: string; body: IDetails }
