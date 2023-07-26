import apiSlice from 'services/api'
import type { DataModels, ILoginForm, IPagination } from 'types'

type MsgResult = { msg: string }
type GetUsersResult = {
  users: Exclude<DataModels.IUser, 'password' | 'address'>[]
  usersLength: number
  pagination: IPagination
}
type GetUsersQuery = {
  page: number
}
type CreateUserResult = MsgResult & {
  data: {
    access_token: string
  }
}
type CreateUserQuery = {
  body: Pick<DataModels.IUser, 'name' | 'email' | 'password'>
}
type LoginResult = MsgResult & {
  data: {
    access_token: string
    root: boolean
    role: string
  }
}
type LoginQuery = { body: ILoginForm }
type EditUserQuery = {
  body: Partial<DataModels.IUser>
}
type GetUserInfoResult = { user: Exclude<DataModels.IUser, 'password'> }

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

    createUser: builder.mutation<CreateUserResult, CreateUserQuery>({
      query: ({ body }) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    login: builder.mutation<LoginResult, LoginQuery>({
      query: ({ body }) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
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
        url: '/api/auth/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useLoginMutation,
  useEditUserMutation,
  useGetUserInfoQuery,
} = userApiSlice
