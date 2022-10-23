import apiSlice from "app/api/api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: ({ body }) => ({
        url: "/api/category",
        method: "POST",
        body,
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

export const { useCreateCategoryMutation, useGetImagesQuery } = userApiSlice;
