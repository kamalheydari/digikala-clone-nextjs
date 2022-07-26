import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { usePostDataMutation } from "app/slices/fetchApiSlice";
import {
  addReviewsItem,
  changeReviewsItems,
  deleteReviewsItem,
  resetReview,
} from "app/slices/reviewsSlice";
import { closeModal, openModal } from "app/slices/modalSlice";

import { ratingStatus } from "utils/constatns";

import { Icons, Loading, CloseModal } from "components";

export default function CommentModal({ title: productTitle, dispatch, id }) {
  //? local State
  const [positiveValue, setPositiveValue] = useState("");
  const [negativeValue, setNegativeValue] = useState("");

  //? Store
  const {
    positivePoints,
    negativePoints,
    rating,
    title,
    comment,
  } = useSelector((state) => state.reviews);
  const { token } = useSelector((state) => state.auth);

  //? Post Query
  const [
    postData,
    { isSuccess, isLoading, data, isError, error },
  ] = usePostDataMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(closeModal());
      dispatch(resetReview());
      dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "success",
          text: data.msg,
        })
      );
    }

    if (isError) {
      dispatch(closeModal());
      dispatch(resetReview());
      dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "error",
          text: error?.data.err,
        })
      );
    }
  }, [isSuccess, isError]);

  //? Handlers
  const handleChangeItems = (e) => {
    dispatch(
      changeReviewsItems({ name: e.target.name, value: e.target.value })
    );
  };

  const handleAddItems = (type) => {
    if (type === "positivePoints") {
      dispatch(addReviewsItem({ type, value: positiveValue }));
      setPositiveValue("");
    }

    if (type === "negativePoints") {
      dispatch(addReviewsItem({ type, value: negativeValue }));
      setNegativeValue("");
    }
  };

  const handleDelete = (type, id) => {
    dispatch(deleteReviewsItem({ type, id }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postData({
      url: `/api/reviews/${id}`,
      token,
      body: { title, comment, rating, positivePoints, negativePoints },
    });
  };

  return (
    <div className='flex flex-col h-full lg:h-[770px] px-5 py-3 bg-white md:rounded-lg gap-y-3 overflow-y-auto'>
      <div className='py-2 border-b-2 border-gray-200'>
        <div className='flex justify-between '>
          <span className='text-sm text-black'>دیدگاه شما</span>
          <CloseModal />
        </div>
        <span>در مورد {productTitle}</span>
      </div>

      <form
        className='flex flex-col justify-between flex-1 gap-y-5'
        onSubmit={handleSubmit}
      >
        {/* rating */}
        <div>
          <div className='text-center my-2'>
            <span className='text-sm text-black'>امتیاز دهید!:‌</span>
            <span className='text-sm text-sky-500 px-1'>
              {ratingStatus[rating]}
            </span>
          </div>
          <input
            id='rating'
            name='rating'
            type='range'
            min='1'
            max='5'
            value={rating}
            step='1'
            className='w-full h-2 bg-gray-200 rounded-lg  cursor-pointer '
            onChange={handleChangeItems}
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
        <div className='space-y-3 '>
          <label
            className='text-xs text-gray-700 lg:text-sm md:min-w-max'
            htmlFor='title'
          >
            عنوان نظر
          </label>
          <input
            className='input'
            type='text'
            name='title'
            id='title'
            required={true}
            onChange={handleChangeItems}
          />
        </div>

        {/* positivePoints */}
        <div className='space-y-3'>
          <div className='space-y-3'>
            <label
              className='text-xs text-gray-700 lg:text-sm md:min-w-max'
              htmlFor='positivePoints'
            >
              نکات مثبت
            </label>
            <div className='input flex items-center'>
              <input
                className='outline-none flex-1 bg-transparent'
                type='text'
                name='positivePoints'
                id='positivePoints'
                value={positiveValue}
                onChange={(e) => setPositiveValue(e.target.value)}
              />
              <button
                onClick={() => handleAddItems("positivePoints")}
                type='button'
              >
                <Icons.Plus className='icon' />
              </button>
            </div>
          </div>
          {positivePoints.length > 0 && (
            <div className='space-y-3'>
              {positivePoints.map((item) => (
                <div key={item.id} className='flex gap-x-4 items-center px-3'>
                  <Icons.Plus className='icon text-green-500' />
                  <span className='ml-auto'>{item.title}</span>
                  <button>
                    <Icons.Delete
                      className='icon text-gray'
                      onClick={() => handleDelete("positivePoints", item.id)}
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
            <div className='input flex items-center'>
              <input
                className='outline-none flex-1 bg-transparent'
                type='text'
                name='negativePoints'
                id='negativePoints'
                value={negativeValue}
                onChange={(e) => setNegativeValue(e.target.value)}
              />
              <button
                onClick={() => handleAddItems("negativePoints")}
                type='button'
              >
                <Icons.Plus className='icon' />
              </button>
            </div>
          </div>
          {negativePoints.length > 0 && (
            <div className='space-y-3'>
              {negativePoints.map((item) => (
                <div key={item.id} className='flex gap-x-4 items-center px-3'>
                  <Icons.Minus className='icon text-red-500' />
                  <span className='ml-auto'>{item.title}</span>
                  <button>
                    <Icons.Delete
                      className='icon text-gray'
                      onClick={() => handleDelete("negativePoints", item.id)}
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
            className='input resize-none h-24'
            type='text'
            name='comment'
            id='comment'
            required={true}
            onChange={handleChangeItems}
          />
        </div>

        <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
          <button className='modal-btn' type='submit' disabled={isLoading}>
            {isLoading ? <Loading /> : "ثبت دیدگاه"}
          </button>
        </div>
      </form>
    </div>
  );
}
