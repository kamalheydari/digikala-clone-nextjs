import { openModal } from "app/slices/modalSlice";
import { addItem, deleteImage } from "app/slices/productSlice";
import { Icons } from "components";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "components";
import { imageUpload } from "utils/imageUpload";
import { useState } from "react";

export default function UploadImages() {
  const [uplodLoading, setUplodLoading] = useState(false);

  const dispatch = useDispatch();

  //? Store
  const {
    product: { images },
  } = useSelector((state) => state.product);

  //? Handlers
  const handleAddImages = (e) => {
    let newImages = [];
    let err = "";
    const files = [...e.target.files];
    console.log(images);

    if (files.length === 0) err = "باید حداقل یک تصویر انتخاب کنید";

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "حجم تصویر نباید بیشتر از 1 مگابایت باشد");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "فرمت تصویر انتخاب شده مناسب نیست");

      newImages.push(file);
    });

    dispatch(addItem({ type: "images", value: newImages }));

    if (err)
      return dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "error",
          text: err,
        })
      );
  };

  const handleDeleteImage = (index) => {
    dispatch(deleteImage(index));
  };

  const handleUploadImages = async () => {
    let media = [];

    const imgNewURL = images.filter((img) => !img.url);
    // const imgOldURL = images.filter((img) => img.url);

    setUplodLoading(true);
    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);
    setUplodLoading(false);

    dispatch(addItem({ type: "uploaded-images", value: media }));

    if (media[0].url)
      dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "success",
          text: "تصاویر با موفقیت آپلود شدند",
        })
      );
  };

  return (
    <div>
      <div className='space-y-1.5'>
        <label
          htmlFor='uploadImage'
          className='text-xs text-gray-700 lg:text-sm '
        >
          انتخاب تصاویر
        </label>
        <input
          className='block w-full px-2 py-1 text-sm text-gray-700 bg-white bg-clip-padding  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          id='uploadImage'
          type='file'
          multiple
          accept='image/*'
          onChange={handleAddImages}
        />
      </div>
      {images?.length > 0 && (
        <div className='pt-1 mt-2 pb-6 bg-gray-50 rounded'>
          <div className='mt-8 flex flex-wrap justify-center align-center gap-x-4 gap-y-2 '>
            {images?.map((img, index) => (
              <div key={index} className='relative'>
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  className='w-44 h-36 rounded-md '
                  alt='product img'
                />
                <button type='button' onClick={() => handleDeleteImage(index)}>
                  <Icons.Delete className='icon text-red-500 absolute top-0 right-0 z-10 w-7 h-7 p-1 rounded-2xl bg-red-100' />
                </button>
              </div>
            ))}
          </div>
          <button
            className='btn mx-auto bg-green-500'
            type='button'
            onClick={handleUploadImages}
          >
            {uplodLoading ? <Loading /> : "آپلود تصاویر"}
          </button>
        </div>
      )}
    </div>
  );
}
