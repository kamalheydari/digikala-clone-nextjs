import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fetchApi = createApi({
  reducerPath: "fetchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: [""],
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ url, token }) => ({
        url,
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": token },
      }),
      providesTags: [""],
    }),

    postData: builder.mutation({
      query: ({ url, body, token }) => ({
        url,
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": token },
        body,
      }),
      invalidatesTags: [""],
    }),

    patchData: builder.mutation({
      query: ({ url, body, token }) => ({
        url,
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": token },
        body,
      }),
      invalidatesTags: [""],
    }),

    putData: builder.mutation({
      query: ({ url, body, token }) => ({
        url,
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": token },
        body,
      }),
      invalidatesTags: [""],
    }),

    deleteData: builder.mutation({
      query: ({ url, token }) => ({
        url,
        method: "DELETE",
        headers: { "Content-Type": "application/json", "Authorization": token },
      }),
      invalidatesTags: [""],
    }),
  }),
});

export const {
  useGetDataQuery,
  usePostDataMutation,
  usePatchDataMutation,
  usePutDataMutation,
  useDeleteDataMutation,
} = fetchApi;

export default fetchApi;
