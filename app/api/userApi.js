import apiSlice from "app/api/api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, token }) => ({
        url: `/api/user?page=${page}`,
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      }),
      providesTags: ["User"],
    }),

    createUser: builder.mutation({
      query: ({ body }) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: ({ body }) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      }),
      invalidatesTags: ["User"],
    }),

    editUser: builder.mutation({
      query: ({token, body }) => ({
        url: "/api/user",
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: token },
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useLoginMutation,
  useDeleteUserMutation,
  useEditUserMutation
} = userApiSlice;
