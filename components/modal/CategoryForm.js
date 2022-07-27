import { useEffect } from "react";

import { addCategory, resetSelectedCategories } from "app/slices/category.slice";
import { usePostDataMutation } from "app/slices/fetchApi.slice";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import validation from "utils/validation";

import {
  CloseModal,
  DisplayError,
  Loading,
  SelectCategories,
} from "components";
import { useSelector } from "react-redux";

export default function CategoryForm({ title, token, dispatch, closeModal }) {
  //? Store
  const { parentCategory, mainCategory } = useSelector(
    (state) => state.categories
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
      dispatch(resetSelectedCategories());
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
  const submitHander = ({ name, slug }) => {
    let parent, category;

    name = name.trim();
    slug = slug.trim().split(" ").join("-");

    //? Set main category
    parent = "/";
    category = parent + slug;

    //? Set parent category
    if (mainCategory.length !== 0) {
      parent = mainCategory;
      category = parent + "/" + slug;
    }

    //? Set child category
    if (parentCategory.length !== 0) {
      parent = "/" + parentCategory;
      category = mainCategory + "/" + parentCategory + "/" + slug;
    }

    postData({
      url: "/api/category",
      body: { name, parent, category, slug },
      token,
    });
  };

  return (
    <div className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-3 '>
      <div className='flex justify-between py-2 border-b-2 border-gray-200 '>
        <h5>{title}</h5>
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
            نام دسته‌بندی
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

        <div className='space-y-3 '>
          <label
            className='text-xs text-gray-700 lg:text-sm md:min-w-max'
            htmlFor='slug'
          >
            مسیر (با حروف انگلیسی)
          </label>
          <input
            className='input sm:max-w-sm lg:max-w-full '
            type='text'
            slug='slug'
            id='slug'
            {...register("slug")}
          />
          <DisplayError errors={formErrors.slug} />
        </div>

        <div className='flex-1 max-w-xl space-y-16 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-10 md:items-baseline'>
          <SelectCategories />
          <div />
        </div>

        <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
          <button className='modal-btn' type='submit' disabled={isLoading}>
            {isLoading ? <Loading /> : "ثبت اطلاعات"}
          </button>
        </div>
      </form>
    </div>
  );
}
