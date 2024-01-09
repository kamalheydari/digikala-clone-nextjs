import { useState, useRef, useEffect } from 'react'

import { nanoid } from '@reduxjs/toolkit'
import { useCreateReviewMutation } from 'services'

import { ratingStatus, reviewSchema } from 'utils'

import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useDisclosure } from 'hooks'

import { ArrowLeft, Comment, Delete, Minus, Plus } from 'icons'
import { HandleResponse } from 'components/shared'
import { Modal, TextField, DisplayError, SubmitModalButton } from 'components/ui'

import type { IReviewForm } from 'types'

interface Props {
  productTitle: string
  prdouctID: string
}

const ReviewModal: React.FC<Props> = (props) => {
  // ? Props
  const { productTitle, prdouctID } = props

  // ? Refs
  const positiveRef = useRef<HTMLInputElement | null>(null)
  const negativeRef = useRef<HTMLInputElement | null>(null)

  // ? State
  const [rating, setRating] = useState(1)

  const [isShowReviewModal, reviewModalHandlers] = useDisclosure()

  // ? Form Hook
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
    control,
    setFocus,
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

  // ? Create Review Query
  const [createReview, { isSuccess, isLoading, data, isError, error }] = useCreateReviewMutation()

  // ? Handlers
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

  // ? Re-Renders
  //*    Use useEffect to set focus after a delay when the modal is shown
  useEffect(() => {
    if (isShowReviewModal) {
      const timeoutId = setTimeout(() => {
        setFocus('title')
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [isShowReviewModal])

  // ? Render(s)
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
            reviewModalHandlers.close()
            reset()
            setRating(1)
          }}
          onError={() => {
            reviewModalHandlers.close()
            reset()
            setRating(1)
          }}
        />
      )}

      <button type="button" onClick={reviewModalHandlers.open} className="flex w-full items-center gap-x-5 py-2">
        <Comment className="icon" />
        <span className="text-sm text-black ">دیدگاه خود را درباره این کالا بنویسید</span>
        <ArrowLeft className="icon mr-auto" />
      </button>

      <Modal isShow={isShowReviewModal} onClose={reviewModalHandlers.close} effect="bottom-to-top">
        <Modal.Content
          onClose={reviewModalHandlers.close}
          className="flex h-full flex-col gap-y-3 bg-white py-3 pl-2 pr-4 md:rounded-lg lg:h-[770px]"
        >
          <Modal.Header onClose={reviewModalHandlers.close}>دیدگاه شما در مورد {productTitle}</Modal.Header>
          <Modal.Body>
            <form
              className="flex flex-1 flex-col justify-between gap-y-5 overflow-y-auto pl-4"
              onSubmit={handleSubmit(submitHander)}
            >
              {/* rating */}
              <div>
                <div className="my-2 text-center">
                  <span className="text-sm text-black">امتیاز دهید!:‌</span>
                  <span className="px-1 text-sm text-sky-500">{ratingStatus[rating]}</span>
                </div>
                <input
                  id="rating"
                  name="rating"
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={rating}
                  className="h-2 w-full cursor-pointer rounded-lg bg-gray-200 "
                  onChange={(e) => {
                    setRating(+e.target.value)
                  }}
                />
                <div className="flex justify-between">
                  {Array(5)
                    .fill('_')
                    .map((_, i) => (
                      <span key={i} className="mx-1.5 inline-block h-1 w-1 rounded-full bg-gray-300" />
                    ))}
                </div>
              </div>

              {/* title */}
              <TextField label="عنوان نظر" control={control} errors={formErrors.title} name="title" />

              {/* positivePoints */}
              <div className="space-y-3">
                <div className="space-y-3">
                  <label className="text-xs text-gray-700 md:min-w-max lg:text-sm" htmlFor="positivePoints">
                    نکات مثبت
                  </label>
                  <div className="input flex items-center">
                    <input
                      className="flex-1 bg-transparent outline-none"
                      type="text"
                      name="positivePoints"
                      id="positivePoints"
                      ref={positiveRef}
                    />
                    <button onClick={handleAddPositivePoint} type="button">
                      <Plus className="icon" />
                    </button>
                  </div>
                </div>
                {positivePointsFields.length > 0 && (
                  <div className="space-y-3">
                    {positivePointsFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-x-4 px-3">
                        <Plus className="icon text-green-500" />
                        <span className="ml-auto">{field.title}</span>
                        <button>
                          <Delete className="icon text-gray-200" onClick={() => removePositivePoint(index)} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* negativePoints */}
              <div className="space-y-3">
                <div className="space-y-3">
                  <label className="text-xs text-gray-700 md:min-w-max lg:text-sm" htmlFor="negativePoints">
                    نکات منفی
                  </label>
                  <div className="input flex items-center">
                    <input
                      className="flex-1 bg-transparent outline-none"
                      type="text"
                      name="negativePoints"
                      id="negativePoints"
                      ref={negativeRef}
                    />
                    <button onClick={handleAddNegativePoint} type="button">
                      <Plus className="icon" />
                    </button>
                  </div>
                </div>

                {negativePointsFields.length > 0 && (
                  <div className="space-y-3">
                    {negativePointsFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-x-4 px-3">
                        <Minus className="icon text-red-500" />
                        <span className="ml-auto">{field.title}</span>
                        <button>
                          <Delete className="icon text-gray-200" onClick={() => removeNegativePoint(index)} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* comment */}
              <div className="space-y-3 ">
                <label className="text-xs text-gray-700 md:min-w-max lg:text-sm" htmlFor="comment">
                  متن نظر
                </label>
                <textarea className="input h-24 resize-none" id="comment" {...register('comment')} />
                <DisplayError errors={formErrors.comment} />
              </div>

              <div className="border-t-2 border-gray-200 py-3 lg:pb-0 ">
                <SubmitModalButton isLoading={isLoading}>ثبت دیدگاه</SubmitModalButton>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default ReviewModal
