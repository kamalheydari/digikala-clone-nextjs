import { useEffect, useState, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useCreateReviewMutation } from "app/api/reviewApi";
import { closeModal } from "app/slices/modal.slice";
import { showAlert } from "app/slices/alert.slice";

import { ratingStatus } from "utils/constatns";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validation from "utils/validation";

import {
  Icons,
  CloseModal,
  ModalWrapper,
  TextField,
  DisplayError,
  SubmitModalBtn,
} from "components";

export default function CommentModal() {
  const dispatch = useDispatch();

  //? Store
  const { title: productTitle, id, isShow, type } = useSelector(
    (state) => state.modal
  );

  //? Form Hook
  const {
    handleSubmit,
    register,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(validation.reviewSchema),
  });

  //? Refs
  const positiveRef = useRef(null);
  const negativeRef = useRef(null);

  //? local State
  const [rating, setRating] = useState(1);
  const [positivePoints, setPositivePoints] = useState([]);
  const [negativePoints, setNegativePoints] = useState([]);

  //? Create Review Query
  const [
    createReview,
    { isSuccess, isLoading, data, isError, error },
  ] = useCreateReviewMutation();

  //? Handle Create Review Response
  useEffect(() => {
    if (isSuccess) {
      dispatch(closeModal());
      reset();
      setNegativePoints([]);
      setPositivePoints([]);
      setRating(1);
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(closeModal());
      reset();
      setNegativePoints([]);
      setPositivePoints([]);
      setRating(1);
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
    }
  }, [isError]);

  //? Handlers
  const handleAddPositivePoint = () => {
    setPositivePoints([
      ...positivePoints,
      { id: nanoid(), title: positiveRef.current.value },
    ]);
    positiveRef.current.value = "";
  };

  const handleAddNegativePoint = () => {
    setNegativePoints([
      ...negativePoints,
      { id: nanoid(), title: negativeRef.current.value },
    ]);
    negativeRef.current.value = "";
  };

  const handleDeletePositivePoint = (id) => {
    const tempPositivePoints = positivePoints.filter((item) => item.id !== id);
    setPositivePoints(tempPositivePoints);
  };

  const handleDeleteNegativePoint = (id) => {
    const tempNegativePoints = negativePoints.filter((item) => item.id !== id);
    setNegativePoints(tempNegativePoints);
  };

  const submitHander = async ({ title, comment }) => {
    await createReview({
      id,
      body: { title, comment, rating, positivePoints, negativePoints },
    });
  };

  return (
    <ModalWrapper isShow={isShow && type === "comment"}>
      <div
        className={`
  ${
    isShow ? "bottom-0 lg:top-20" : "-bottom-full lg:top-60"
  } w-full h-full lg:h-fit lg:max-w-3xl fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
        <div className='flex flex-col h-full lg:h-[770px] pl-2 pr-4 py-3 bg-white md:rounded-lg gap-y-3 '>
          <div className='py-2 border-b-2 border-gray-200'>
            <div className='flex justify-between '>
              <span className='text-sm text-black'>دیدگاه شما</span>
              <CloseModal />
            </div>
            <span>در مورد {productTitle}</span>
          </div>

          <form
            className='flex flex-col justify-between flex-1 gap-y-5 overflow-y-auto pl-4'
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
                  setRating(+e.target.value);
                }}
              />
              <div className='flex justify-between'>
                <span className='h-1 w-1 rounded-full mx-1.5 bg-gray-300 inline-block' />
                <span className='h-1 w-1 rounded-full mx-1.5 bg-gray-300 inline-block' />
                <span className='h-1 w-1 rounded-full mx-1.5 bg-gray-300 inline-block' />
                <span className='h-1 w-1 rounded-full mx-1.5 bg-gray-300 inline-block' />
                <span className='h-1 w-1 rounded-full mx-1.5 bg-gray-300 inline-block' />
              </div>
            </div>

            {/* title */}
            <TextField
              label='عنوان نظر'
              control={control}
              errors={formErrors.title}
              name='title'
              type='text'
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
              {positivePoints.length > 0 && (
                <div className='space-y-3'>
                  {positivePoints.map((item, index) => (
                    <div
                      key={item.id}
                      className='flex items-center px-3 gap-x-4'
                    >
                      <Icons.Plus className='text-green-500 icon' />
                      <span className='ml-auto'>{item.title}</span>
                      <button>
                        <Icons.Delete
                          className='icon text-gray'
                          onClick={() => handleDeletePositivePoint(item.id)}
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
              {negativePoints.length > 0 && (
                <div className='space-y-3'>
                  {negativePoints.map((item) => (
                    <div
                      key={item.id}
                      className='flex items-center px-3 gap-x-4'
                    >
                      <Icons.Minus className='text-red-500 icon' />
                      <span className='ml-auto'>{item.title}</span>
                      <button>
                        <Icons.Delete
                          className='icon text-gray'
                          onClick={() => handleDeleteNegativePoint(item.id)}
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
                type='text'
                name='comment'
                id='comment'
                {...register("comment")}
              />
              <DisplayError errors={formErrors.comment} />
            </div>

            <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
              <SubmitModalBtn isLoading={isLoading}>ثبت دیدگاه</SubmitModalBtn>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}
