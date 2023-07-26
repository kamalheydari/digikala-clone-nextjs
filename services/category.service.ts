import apiSlice from 'services/api'
import type { DataModels, ICategoriesList, ICategoryForm } from 'types'

type MsgResult = { msg: string }
type IdQuery = { id: string }
type GetCategoriesResult = {
  categories: DataModels.ICategory[]
  categoriesList: ICategoriesList
}
type GetSingleCategoryResult = DataModels.ICategory
type UpdateCategoryQuery = { id: string; body: DataModels.ICategory }
type CreateCategoryQuery = {
  body: ICategoryForm
}

export const categoryApiSlice = apiSlice.injectEndpoints({
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
} = categoryApiSlice
