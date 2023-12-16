import baseApi from 'services/baseApi'

import type {
  CreateBannerQuery,
  GetBannersQuery,
  GetBannersResult,
  GetSingleBannerResult,
  IdQuery,
  MsgResult,
  UpdateBannerQuery,
} from './types'

export const bannerApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<GetBannersResult, GetBannersQuery>({
      query: ({ category }) => ({
        url: `/api/banner?category=${category}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Banner' as const,
                id: _id,
              })),
              'Banner',
            ]
          : ['Banner'],
    }),

    getSingleBanner: builder.query<GetSingleBannerResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/banner/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Banner', id: arg.id }],
    }),

    updateBanner: builder.mutation<MsgResult, UpdateBannerQuery>({
      query: ({ id, body }) => ({
        url: `/api/banner/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Banner', id: arg.id }],
    }),

    createBanner: builder.mutation<MsgResult, CreateBannerQuery>({
      query: ({ body }) => ({
        url: '/api/banner',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Banner'],
    }),

    deleteBanner: builder.mutation<MsgResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/banner/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner'],
    }),
  }),
})

export const {
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetBannersQuery,
} = bannerApiSlice
