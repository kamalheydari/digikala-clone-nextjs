import apiSlice from 'services/api'
import { userApiSlice } from 'services'

import type { DataModels, ILoginForm } from 'types'
import { logout } from 'store'

type MsgResult = { msg: string }

type CreateUserResult = MsgResult
type CreateUserQuery = {
  body: Pick<DataModels.IUser, 'name' | 'email' | 'password'>
}
type LoginResult = MsgResult & { access_token: string }
type LoginQuery = { body: ILoginForm }

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<CreateUserResult, CreateUserQuery>({
      query: ({ body }) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled
        await dispatch(userApiSlice.endpoints.getUserInfo.initiate())
      },
    }),

    login: builder.mutation<LoginResult, LoginQuery>({
      query: ({ body }) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
        credentials: 'include',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled
        await dispatch(userApiSlice.endpoints.getUserInfo.initiate())
      },
    }),

    logout: builder.query<MsgResult, undefined>({
      query: () => ({
        url: '/api/auth/logout',
        method: 'GET',
        credentials: 'include',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        await queryFulfilled
         dispatch(logout())
      },
    }),
  }),
})

export const { useLoginMutation, useLogoutQuery, useRegisterMutation } =
  authApiSlice
