import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { addCategory } from "app/slices/categorySlice";
import { usePostDataMutation } from "app/slices/fetchApiSlice";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import validation from "utils/validation";

import { CloseModal, DisplayError, Loading } from "components";

export default function CategoryForm({ title, token, dispatch, closeModal }) {
  const [changeParentCategory, setchangeParentCategory] = useState("");

  //? Store
  const { categories } = useSelector((state) => state.categories);

  //? Initial Select box
  const parentCategories = categories.filter(
    (category) => category.parent === changeParentCategory
  );
  const mainCategories = categories.filter(
    (category) => category.parent === "/"
  );

  //? Post Data
  const [
    postData,
    { data, isSuccess, isLoading, error },
  ] = usePostDataMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(addCategory(data.newCategory));
      dispatch(closeModal());
      reset();
    }
  }, [isSuccess]);

  //? Form Hook
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(validation.categorySchema),
  });

  //? Handlers
  const submitHander = ({ name, mainCategory, parentCategory }) => {
    let parent, category;

    //? Set main category
    parent = "/";
    category = parent + name.trim();

    //? Set parent category
    if (mainCategory.length !== 0) {
      parent = "/" + mainCategory;
      category = "/" + name.trim();
    }

    //? Set child category
    if (parentCategory.length > 0) {
      parent = "/" + parentCategory;
      category = "/" + mainCategory + "/" + parentCategory + "/" + name.trim();
    }

    postData({ url: "/api/category", body: { name, parent, category }, token });
  };

  return (
    <div className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-3  '>
      <div className='flex justify-between py-2 border-b-2 border-gray-200 '>
        <span className='text-sm'>{title}</span>
        <CloseModal />
      </div>

      <form
        className='flex flex-col justify-between flex-1 gap-y-5 '
        onSubmit={handleSubmit(submitHander)}
      >
        <div className='space-y-3 '>
          <label
            className='text-xs text-gray-700 lg:text-sm md:min-w-max'
            htmlFor='name'
          >
            دسته‌بندی
          </label>
          <input
            className='input sm:max-w-sm lg:max-w-full '
            type='text'
            name='name'
            id='name'
            {...register("name")}
          />
          <DisplayError errors={formErrors.name} />
        </div>

        <div className='flex-1 max-w-xl space-y-16 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-10 md:items-baseline lg:relative'>
          <div className='flex flex-col items-start justify-between gap-y-2'>
            <label
              className='text-xs text-gray-700 lg:text-sm md:min-w-max'
              htmlFor='mainCategory'
            >
              دسته‌بندی اصلی
            </label>
            <select
              className='border-2 rounded-sm py-0.5 px-3 outline-none w-56'
              name='mainCategory'
              id='mainCategory'
              {...register("mainCategory")}
              onChange={(e) => setchangeParentCategory("/" + e.target.value)}
            >
              <option></option>
              {mainCategories.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col items-start justify-between gap-y-2 '>
            <label
              className='text-xs text-gray-700 lg:text-sm md:min-w-max'
              htmlFor='parentCategory'
            >
              دسته‌بندی والد
            </label>
            <select
              className='border-2 rounded-sm py-0.5 px-3 outline-none w-56'
              name='parentCategory'
              id='parentCategory'
              {...register("parentCategory")}
            >
              <option></option>
              {parentCategories.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div />
        </div>

        <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
          <button
            className='w-full max-w-xl mx-auto rounded-md btn lg:w-64 lg:ml-0'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "ثبت اطلاعات"}
          </button>
        </div>
      </form>
    </div>
  );
}
