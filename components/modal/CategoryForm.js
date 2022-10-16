import { useEffect, useState } from "react";

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
  CloseModal,
  Loading,
  SelectCategories,
  UploadImages,
  ModalWrapper,
  Input,
} from "components";
import { useSelector } from "react-redux";

export default function CategoryForm({
  title,
  token,
  dispatch,
  closeModal,
  isShow,
}) {
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
      dispatch(closeModal());
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
      dispatch(closeModal());
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
      url: "/api/category",
      body: { name, parent, category, slug, image: images[0] },
      token,
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
    <ModalWrapper isShow={isShow}>
      <div
        className={`
  ${
    isShow ? "bottom-0 lg:top-20" : "-bottom-full lg:top-28"
  } w-full h-[90vh] lg:h-fit lg:max-w-3xl fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
        <div className='flex flex-col h-full lg:h-[770px] pl-2 pr-4 py-3 bg-white md:rounded-lg gap-y-3 '>
          <div className='flex justify-between py-2 border-b-2 border-gray-200 '>
            <h5>{title}</h5>
            <CloseModal />
          </div>

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

            <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
              <button className='modal-btn' type='submit' disabled={isLoading}>
                {isLoading ? <Loading /> : "ثبت اطلاعات"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}
