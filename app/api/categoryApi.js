import apiSlice from "app/api/api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: ({ body, token }) => ({
        url: "/api/category",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json", Authorization: token },
      }),
      invalidatesTags: ["Category"],
    }),

    getImages: builder.query({
      query: () => ({
        url: "/api/images",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const { useCreateCategoryMutation,useGetImagesQuery } = userApiSlice;
