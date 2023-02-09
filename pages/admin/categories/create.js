import Head from "next/head";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
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
  PageContainer,
} from "components";

export default function CreateCategory() {
  const dispatch = useDispatch();

  //?  States
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});

  //? Create Category 
  const [
    createCtegory,
    { data, isSuccess, isLoading, error, isError },
  ] = useCreateCategoryMutation();

  //? Handle Create Category Response
  useEffect(() => {
    if (isSuccess) {
      setImages([]);
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

    if (
      selectedCategories?.lvlOneCategory?._id &&
      !selectedCategories?.lvlTwoCategory?._id
    ) {
      //* Set LvlTwo category

      parent = selectedCategories?.lvlOneCategory.category;
      category = parent + "/" + slug;
    } else if (
      selectedCategories?.lvlOneCategory?._id &&
      selectedCategories?.lvlTwoCategory?._id
    ) {
      //* Set lvlThree category

      parent = "/" + selectedCategories?.lvlTwoCategory.slug;
      category =
        "/" +
        selectedCategories?.lvlOneCategory.slug +
        "/" +
        selectedCategories?.lvlTwoCategory.slug +
        "/" +
        slug;
    } else {
      //* Set LvlOne category

      parent = "/";
      category = parent + slug;
    }

    createCtegory({
      body: { name, parent, category, slug, image: images[0] },
    });
  };

  const deleteImageHandler = () => {
    setImages([]);
  };

  const addImageHandler = (newImages) => {
    setImages([...newImages]);
  };

  const getUploadedImagesHandler = (media, imgOldURL) => {
    setImages([...media, ...imgOldURL]);
  };


  //? Render
  return (
    <>
      <main>
        <Head>
          <title>مدیریت | دسته بندی جدید</title>
        </Head>

        <PageContainer title='دسته بندی جدید'>
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

              <SelectCategories
                setSelectedCategories={setSelectedCategories}
                show={["lvlOne", "lvlTwo"]}
              />

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
        </PageContainer>
      </main>
    </>
  );
}

CreateCategory.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
