import apiSlice from 'services/api'

import type { DataModels, IPagination } from 'types'

type MsgResult = { msg: string }
type GetUsersResult = {
  users: Exclude<DataModels.IUser, 'password' | 'address'>[]
  usersLength: number
  pagination: IPagination
}
type GetUsersQuery = {
  page: number
}
type EditUserQuery = {
  body: Partial<DataModels.IUser>
}
type GetUserInfoResult = Exclude<DataModels.IUser, 'password'>

export const userApiSlice = apiSlice.injectEndpoints({
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

export const { useEditUserMutation, useGetUserInfoQuery, useGetUsersQuery } =
  userApiSlice
