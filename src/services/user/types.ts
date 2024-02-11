import type { IPagination, IUser } from '@/types'

export type MsgResult = { msg: string }
export type GetUsersResult = {
  users: Exclude<IUser, 'password' | 'address'>[]
  usersLength: number
  pagination: IPagination
}
export type GetUsersQuery = {
  page: number
}
export type EditUserQuery = {
  body: Partial<IUser>
}
export type GetUserInfoResult = Exclude<IUser, 'password'>
