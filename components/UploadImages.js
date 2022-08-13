import { useState } from "react";

import { useDispatch } from "react-redux";
import { showAlert } from "app/slices/alert.slice";

import { imageUpload } from "utils/imageUpload";

import { Icons, Loading } from "components";

export default function UploadImages({
  multiple,
  deleteImageHandler,
  images,
  addImage,
  getUploadedImages,
}) {
  const dispatch = useDispatch();

  //? Local State
  const [uploadLoading, setUploadLoading] = useState(false);

  //? Store

  //? Handlers
  const handleAddImages = (e) => {
    let newImages = [];
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0) err = "باید حداقل یک تصویر انتخاب کنید";

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "حجم تصویر نباید بیشتر از 1 مگابایت باشد");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "فرمت تصویر انتخاب شده مناسب نیست");

      newImages.push(file);
    });

    addImage(newImages);

    if (err)
      return dispatch(
        showAlert({
          status: "error",
          title: err,
        })
      );
  };

  const handleUploadImages = async () => {
    let media = [];

    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    setUploadLoading(true);
    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);
    setUploadLoading(false);

    getUploadedImages(media, imgOldURL);

    if (media[0]?.url && multiple)
      dispatch(
        showAlert({
          status: "success",
          title: "تصاویر با موفقیت آپلود شدند",
        })
      );
  };

  return (
    <section>
      <div className='space-y-1.5'>
        <label
          htmlFor='uploadImage'
          className='text-xs text-gray-700 lg:text-sm '
        >
          انتخاب تصاویر
        </label>
        <input
          className='block w-full px-2 py-1 text-sm text-gray-700 bg-white bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          id='uploadImage'
          type='file'
          multiple={multiple}
          accept='image/*'
          onChange={handleAddImages}
        />
      </div>
      {images?.length > 0 && (
        <div className='pt-1 pb-6 mt-2 rounded bg-gray-50'>
          <div className='flex flex-wrap justify-center mt-8 align-center gap-x-4 gap-y-2 '>
            {images?.map((img, index) => (
              <div key={index} className='relative'>
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  className='rounded-md w-44 h-36 '
                  alt='product img'
                />
                <button type='button' onClick={() => deleteImageHandler(index)}>
                  <Icons.Delete className='absolute top-0 right-0 z-10 p-1 text-red-500 bg-red-100 icon w-7 h-7 rounded-2xl' />
                </button>
              </div>
            ))}
          </div>
          <button
            className='mx-auto bg-green-500 btn rounded-3xl'
            type='button'
            onClick={handleUploadImages}
            disabled={uploadLoading}
          >
            {uploadLoading ? <Loading /> : "آپلود تصاویر"}
          </button>
        </div>
      )}
    </section>
  );
}
