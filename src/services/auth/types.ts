import type { ILoginForm, IUser } from '@/types'

export type MsgResult = { msg: string }

export type CreateUserResult = MsgResult
export type CreateUserQuery = {
  body: Pick<IUser, 'name' | 'email' | 'password'>
}
export type LoginResult = MsgResult & { access_token: string }
export type LoginQuery = { body: ILoginForm }
