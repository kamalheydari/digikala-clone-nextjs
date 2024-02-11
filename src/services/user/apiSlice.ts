import baseApi from '@/services/baseApi'

import type { EditUserQuery, GetUserInfoResult, GetUsersQuery, GetUsersResult, MsgResult } from './types'

export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<GetUsersResult, GetUsersQuery>({
      query: ({ page }) => ({
        url: `/api/user?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    editUser: builder.mutation<MsgResult, EditUserQuery>({
      query: ({ body }) => ({
        url: '/api/user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    getUserInfo: builder.query<GetUserInfoResult, void>({
      query: () => ({
        url: '/api/user/me',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['User'],
    }),
  }),
})

export const { useEditUserMutation, useGetUserInfoQuery, useGetUsersQuery } = userApiSlice
