import { useState, useRef } from 'react'

import { nanoid } from '@reduxjs/toolkit'
import { useCreateReviewMutation } from 'services'

import { ratingStatus, reviewSchema } from 'utils'

import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Icons,
  TextField,
  DisplayError,
  SubmitModalButton,
  Modal,
  HandleResponse,
} from 'components'

import type { IReviewForm } from 'types'

interface Props {
  isShow: boolean
  onClose: () => void
  productTitle: string
  prdouctID: string
}

const ReviewModal: React.FC<Props> = (props) => {
  //? Props
  const { isShow, onClose, productTitle, prdouctID } = props

  //? Refs
  const positiveRef = useRef<HTMLInputElement | null>(null)
  const negativeRef = useRef<HTMLInputElement | null>(null)

  //? State
  const [rating, setRating] = useState(1)

  //? Form Hook
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
    control,
  } = useForm<IReviewForm>({
    resolver: yupResolver(reviewSchema),
  })

  const {
    fields: positivePointsFields,
    append: appentPositivePoint,
    remove: removePositivePoint,
  } = useFieldArray({
    name: 'positivePoints',
    control,
  })

  const {
    fields: negativePointsFields,
    append: appendNegativePoint,
    remove: removeNegativePoint,
  } = useFieldArray({
    name: 'negativePoints',
    control,
  })

  //? Create Review Query
  const [createReview, { isSuccess, isLoading, data, isError, error }] =
    useCreateReviewMutation()

  //? Handlers
  const handleAddPositivePoint = () => {
    if (positiveRef.current) {
      appentPositivePoint({ id: nanoid(), title: positiveRef.current.value })
      positiveRef.current.value = ''
    }
  }

  const handleAddNegativePoint = () => {
    if (negativeRef.current) {
      appendNegativePoint({ id: nanoid(), title: negativeRef.current.value })
      negativeRef.current.value = ''
    }
  }

  const submitHander: SubmitHandler<IReviewForm> = (data) =>
    createReview({
      id: prdouctID,
      body: { ...data, rating },
    })

  //? Render(s)
  return (
    <>
      {/* Handle Create Review Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.msg}
          onSuccess={() => {
            onClose()
            reset()
            setRating(1)
          }}
          onError={() => {
            onClose()
            reset()
            setRating(1)
          }}
        />
      )}

      <Modal isShow={isShow} onClose={onClose} effect='bottom-to-top'>
        <Modal.Content
          onClose={onClose}
          className='flex flex-col h-full lg:h-[770px] pl-2 pr-4 py-3 bg-white md:rounded-lg gap-y-3'
        >
          <Modal.Header onClose={onClose}>
            دیدگاه شما در مورد {productTitle}
          </Modal.Header>
          <Modal.Body>
            <form
              className='flex flex-col justify-between flex-1 pl-4 overflow-y-auto gap-y-5'
              onSubmit={handleSubmit(submitHander)}
            >
              {/* rating */}
              <div>
                <div className='my-2 text-center'>
                  <span className='text-sm text-black'>امتیاز دهید!:‌</span>
                  <span className='px-1 text-sm text-sky-500'>
                    {ratingStatus[rating]}
                  </span>
                </div>
                <input
                  id='rating'
                  name='rating'
                  type='range'
                  min='1'
                  max='5'
                  step='1'
                  value={rating}
                  className='w-full h-2 bg-gray-200 rounded-lg cursor-pointer '
                  onChange={(e) => {
                    setRating(+e.target.value)
                  }}
                />
                <div className='flex justify-between'>
                  {Array(5)
                    .fill('_')
                    .map((_, i) => (
                      <span
                        key={i}
                        className='h-1 w-1 rounded-full mx-1.5 bg-gray-300 inline-block'
                      />
                    ))}
                </div>
              </div>

              {/* title */}
              <TextField
                label='عنوان نظر'
                control={control}
                errors={formErrors.title}
                name='title'
              />

              {/* positivePoints */}
              <div className='space-y-3'>
                <div className='space-y-3'>
                  <label
                    className='text-xs text-gray-700 lg:text-sm md:min-w-max'
                    htmlFor='positivePoints'
                  >
                    نکات مثبت
                  </label>
                  <div className='flex items-center input'>
                    <input
                      className='flex-1 bg-transparent outline-none'
                      type='text'
                      name='positivePoints'
                      id='positivePoints'
                      ref={positiveRef}
                    />
                    <button onClick={handleAddPositivePoint} type='button'>
                      <Icons.Plus className='icon' />
                    </button>
                  </div>
                </div>
                {positivePointsFields.length > 0 && (
                  <div className='space-y-3'>
                    {positivePointsFields.map((field, index) => (
                      <div
                        key={field.id}
                        className='flex items-center px-3 gap-x-4'
                      >
                        <Icons.Plus className='text-green-500 icon' />
                        <span className='ml-auto'>{field.title}</span>
                        <button>
                          <Icons.Delete
                            className='icon text-gray'
                            onClick={() => removePositivePoint(index)}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* negativePoints */}
              <div className='space-y-3'>
                <div className='space-y-3'>
                  <label
                    className='text-xs text-gray-700 lg:text-sm md:min-w-max'
                    htmlFor='negativePoints'
                  >
                    نکات منفی
                  </label>
                  <div className='flex items-center input'>
                    <input
                      className='flex-1 bg-transparent outline-none'
                      type='text'
                      name='negativePoints'
                      id='negativePoints'
                      ref={negativeRef}
                    />
                    <button onClick={handleAddNegativePoint} type='button'>
                      <Icons.Plus className='icon' />
                    </button>
                  </div>
                </div>

                {negativePointsFields.length > 0 && (
                  <div className='space-y-3'>
                    {negativePointsFields.map((field, index) => (
                      <div
                        key={field.id}
                        className='flex items-center px-3 gap-x-4'
                      >
                        <Icons.Minus className='text-red-500 icon' />
                        <span className='ml-auto'>{field.title}</span>
                        <button>
                          <Icons.Delete
                            className='icon text-gray'
                            onClick={() => removeNegativePoint(index)}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* comment */}
              <div className='space-y-3 '>
                <label
                  className='text-xs text-gray-700 lg:text-sm md:min-w-max'
                  htmlFor='comment'
                >
                  متن نظر
                </label>
                <textarea
                  className='h-24 resize-none input'
                  id='comment'
                  {...register('comment')}
                />
                <DisplayError errors={formErrors.comment} />
              </div>

              <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
                <SubmitModalButton isLoading={isLoading}>
                  ثبت دیدگاه
                </SubmitModalButton>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default ReviewModal
