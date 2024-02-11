import baseApi from '@/services/baseApi'
import { userApiSlice } from '@/services'

import type { CreateUserQuery, CreateUserResult, LoginQuery, LoginResult, MsgResult } from './types'

export const authApiSlice = baseApi.injectEndpoints({
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
    }),
  }),
})

export const { useLoginMutation, useLogoutQuery, useRegisterMutation } = authApiSlice
