import baseApi from 'services/baseApi'

import type {
  CreateSliderQuery,
  GetSingleSliderResult,
  GetSlidersQuery,
  GetSlidersResult,
  IdQuery,
  MsgResult,
  UpdateSliderQuery,
} from './types'

export const sliderApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleSlider: builder.query<GetSingleSliderResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/slider/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Slider', id: arg.id }],
    }),

    getSliders: builder.query<GetSlidersResult, GetSlidersQuery>({
      query: ({ category }) => ({
        url: `/api/slider?category=${category}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({
                type: 'Slider' as const,
                id: _id,
              })),
              'Slider',
            ]
          : ['Slider'],
    }),

    updateSlider: builder.mutation<MsgResult, UpdateSliderQuery>({
      query: ({ id, body }) => ({
        url: `/api/slider/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Slider', id: arg.id }],
    }),

    createSlider: builder.mutation<MsgResult, CreateSliderQuery>({
      query: ({ body }) => ({
        url: '/api/slider',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Slider'],
    }),

    deleteSlider: builder.mutation<MsgResult, IdQuery>({
      query: ({ id }) => ({
        url: `/api/slider/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Slider'],
    }),
  }),
})

export const {
  useGetSingleSliderQuery,
  useUpdateSliderMutation,
  useCreateSliderMutation,
  useDeleteSliderMutation,
  useGetSlidersQuery,
} = sliderApiSlice
