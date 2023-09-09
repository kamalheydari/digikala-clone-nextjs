import apiSlice from 'services/api'
import { endFetching, login, startFetching } from 'store'

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
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ _id }) => ({
                type: 'User' as const,
                id: _id,
              })),
              'User',
            ]
          : ['User'],
    }),

    editUser: builder.mutation<MsgResult, EditUserQuery>({
      query: ({ body }) => ({
        url: '/api/user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, err, arg) => [
        { type: 'User', id: arg.body._id },
      ],
    }),

    getUserInfo: builder.query<GetUserInfoResult, void>({
      query: () => ({
        url: '/api/user/me',
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: ['User'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(startFetching())
        try {
          const { data } = await queryFulfilled
          dispatch(login(data))
        } catch (err) {
        } finally {
          dispatch(endFetching())
        }
      },
    }),
  }),
})

export const { useGetUsersQuery, useEditUserMutation, useGetUserInfoQuery } =
  userApiSlice
