import baseApi from 'services/baseApi'

import { generateQueryParams } from 'utils'

import type {
  CreateCategoryQuery,
  GetCategoriesResult,
  GetSingleCategoryResult,
  GetSubCategoriesQuery,
  GetSubCategoriesResult,
  IdQuery,
  MsgResult,
  UpdateCategoryQuery,
} from './types'

export const categoryApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResult, void>({
      query: () => ({
        url: '/api/category',
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.categories.map(({ _id }) => ({
                type: 'Category' as const,
                id: _id,
              })),
              'Category',
            ]
          : ['Category'],
    }),

    getSingleCategory: builder.query<GetSingleCategoryResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/category/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Category', id: arg.id }],
    }),

    getSubCategories: builder.query<GetSubCategoriesResult,GetSubCategoriesQuery>({
      query: ({ ...params }) => {
        const queryParams = generateQueryParams(params)
        return {
          url: `/api/category/subCategories?${queryParams}`,
          method: 'GET',
        }
      },
    }),

    updateCategory: builder.mutation<MsgResult, UpdateCategoryQuery>({
      query: ({ id, body }) => ({
        url: `/api/category/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Category', id: arg.id },
      ],
    }),

    createCategory: builder.mutation<MsgResult, CreateCategoryQuery>({
      query: ({ body }) => ({
        url: '/api/category',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
  }),
})

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useGetSubCategoriesQuery,
} = categoryApiSlice
