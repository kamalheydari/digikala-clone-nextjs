import Head from "next/head";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  resetSelectedCategories,
} from "app/slices/category.slice";
import { useCreateCategoryMutation } from "app/api/categoryApi";
import { showAlert } from "app/slices/alert.slice";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import validation from "utils/validation";

import {
  Loading,
  SelectCategories,
  UploadImages,
  Input,
  Buttons,
} from "components";


export default function CreateCategory() {
  const dispatch = useDispatch();

  //? Local States
  const [images, setImages] = useState([]);

  //? Store
  const { parentCategory, mainCategory } = useSelector(
    (state) => state.categories
  );

  //? Create Category Query
  const [
    createCtegory,
    { data, isSuccess, isLoading, error, isError },
  ] = useCreateCategoryMutation();

  //? Handle Create Category Response
  useEffect(() => {
    if (isSuccess) {
      dispatch(addCategory(data.newCategory));
      setImages([]);
      dispatch(resetSelectedCategories());
      reset();
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
      setImages([]);
      dispatch(resetSelectedCategories());
      reset();
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
    }
  }, [isError]);

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

    createCtegory({
      body: { name, parent, category, slug, image: images[0] },
    });
  };

  const deleteImageHandler = (index) => {
    setImages([]);
  };

  const addImageHandler = (newImages) => {
    setImages([...newImages]);
  };

  const getUploadedImagesHandler = (media, imgOldURL) => {
    setImages([...media, ...imgOldURL]);
  };

  return (
    <>
      <main>
        <Head>
          <title>مدیریت | دسته بندی جدید</title>
        </Head>

        <Buttons.Back backRoute='/admin'>دسته بندی جدید</Buttons.Back>
        <div className='section-divide-y' />

        <section className='p-3 md:px-3 xl:px-8 2xl:px-10'>
          <form
            className='flex flex-col justify-between flex-1 gap-y-5 overflow-y-auto pl-4'
            onSubmit={handleSubmit(submitHander)}
          >
            <Input
              label='نام دسته‌بندی'
              register={register}
              errors={formErrors.name}
              name='name'
              type='text'
            />

            <Input
              label='مسیر (با حروف انگلیسی)'
              register={register}
              errors={formErrors.slug}
              name='slug'
              type='text'
            />

            <UploadImages
              deleteImageHandler={deleteImageHandler}
              images={images}
              addImage={addImageHandler}
              getUploadedImages={getUploadedImagesHandler}
            />

            <div className='flex-1 max-w-xl space-y-16 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-10 md:items-baseline'>
              <SelectCategories />
              <div />
            </div>

            <div className='py-3 lg:pb-0 '>
              <button
                className='px-6 mx-auto mt-8 bg-green-500 rounded-3xl btn'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? <Loading /> : "ثبت اطلاعات"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

CreateCategory.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
