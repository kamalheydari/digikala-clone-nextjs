import apiSlice from 'services/api'

export const sliderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleSlider: builder.query({
      query: ({ id }) => ({
        url: `/api/slider/${id}`,
        method: 'GET',
      }),
      providesTags: ['Slider'],
    }),

    updateSlider: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/slider/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Slider'],
    }),

    createSlider: builder.mutation({
      query: ({ body }) => ({
        url: '/api/slider',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Slider'],
    }),

    deleteSlider: builder.mutation({
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
} = sliderApiSlice
