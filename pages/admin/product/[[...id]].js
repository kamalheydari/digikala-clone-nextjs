import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { resetSelectedCategories } from "app/slices/category.slice";
import { openModal } from "app/slices/modal.slice";
import { showAlert } from "app/slices/alert.slice";
import {
  addItem,
  changeProductItems,
  deleteImage,
  fetchDetails,
  fetchProduct,
  resetProduct,
} from "app/slices/product.slice";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "app/api/productApi";

import {
  Buttons,
  AddColors,
  SelectCategories,
  AddSizes,
  UploadImages,
  Loading,
  HandleUpdate,
  ConfirmUpdateModal,
} from "components";

import getDetailsArray from "utils/getDetailsArray";

export default function Product() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? Local State
  const [categoryID, setCategoryID] = useState(null);

  //? TABLE Refs
  const infoTableRef = useRef(null);
  const specificationTableRef = useRef(null);

  //? Store
  const { isConfirmUpdate } = useSelector((state) => state.modal);
  const { parentCategory, mainCategory, categories, category } = useSelector(
    (state) => state.categories
  );
  const { infoArray, specificationArray, optionsType, product } = useSelector(
    (state) => state.product
  );

  //? Select Category To Fetch Details
  useEffect(() => {
    if (parentCategory.length > 0) {
      const { _id } = categories.find((cat) => cat.slug === parentCategory);
      setCategoryID(_id);
    }
  }, [parentCategory]);

  useEffect(() => {
    if (categoryID) {
      dispatch(fetchDetails(categoryID));
    }
  }, [categoryID]);

  //? Create Product Query
  const [
    createProduct,
    { data, isSuccess, isLoading, isError, error },
  ] = useCreateProductMutation();

  //? Update Product Query
  const [
    updateProduct,
    {
      data: data_update,
      isSuccess: isSuccess_update,
      isError: isError_update,
      error: error_update,
      isLoading: isLoading_update,
    },
  ] = useUpdateProductMutation();

  //? Handle Create Product Response
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
      router.push("/admin/products");
      dispatch(resetSelectedCategories());
      dispatch(resetProduct());
    }
    if (isError) {
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
    }
  }, [isSuccess, isError]);

  //? Reset Category
  useEffect(() => {
    return () => dispatch(resetSelectedCategories());
  }, []);

  //? Edit Product
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      dispatch(resetProduct());
      dispatch(fetchProduct(id));
    } else {
      dispatch(resetProduct());
    }
  }, [id]);

  //? Hanlders
  const submitHandler = async (e) => {
    e.preventDefault();

    const infoArray = await getDetailsArray(infoTableRef);
    const specificationArray = await getDetailsArray(specificationTableRef);

    createProduct({
      body: {
        ...product,
        info: infoArray,
        specification: specificationArray,
        category: category ? category : mainCategory + "/" + parentCategory,
      },
    });
  };

  const updateHandler = async () => {
    const infoArray = await getDetailsArray(infoTableRef);
    const specificationArray = await getDetailsArray(specificationTableRef);

    dispatch(
      openModal({
        isShow: true,
        id,
        type: "confirm-update-product",
        title: "مشخصات و ویژگی های",
        editedData: {
          ...product,
          info: infoArray,
          specification: specificationArray,
        },
      })
    );
  };

  const deleteImageHandler = (index) => {
    dispatch(deleteImage(index));
  };

  const addImageHandler = (newImages) => {
    dispatch(addItem({ type: "images", value: newImages }));
  };

  const getUploadedImagesHandler = (media, imgOldURL) => {
    dispatch(
      addItem({ type: "uploaded-images", value: [...media, ...imgOldURL] })
    );
  };

  return (
    <>
      {isConfirmUpdate && (
        <HandleUpdate
          updateFunc={updateProduct}
          isSuccess={isSuccess_update}
          isError={isError_update}
          error={error_update}
          data={data_update}
        />
      )}

      <ConfirmUpdateModal
        isLoading={isLoading_update}
        isSuccess={isSuccess_update}
      />

      <main>
        <Head>
          <title>مدیریت | {id ? "بروزرسانی محصول" : "محصول جدید"}</title>
        </Head>

        <Buttons.Back backRoute='/admin'>
          {id ? "بروزرسانی محصول" : "محصول جدید"}
        </Buttons.Back>
        <div className='section-divide-y' />

        <section className='p-3 md:px-3 xl:px-8 2xl:px-10'>
          <form onSubmit={submitHandler} className='space-y-10'>
            <div className='space-y-1.5'>
              <label htmlFor='title'>عنوان</label>
              <input
                type='text'
                className='text-right input'
                name='title'
                id='title'
                value={product.title}
                onChange={(e) =>
                  dispatch(
                    changeProductItems({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <div className='space-y-1.5'>
              <label htmlFor='description'>معرفی</label>
              <textarea
                cols='30'
                rows='4'
                type='text'
                className='text-right input'
                name='description'
                id='description'
                value={product.description}
                onChange={(e) =>
                  dispatch(
                    changeProductItems({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  )
                }
              />
            </div>
            <UploadImages
              multiple
              deleteImageHandler={deleteImageHandler}
              images={product.images}
              addImage={addImageHandler}
              getUploadedImages={getUploadedImagesHandler}
            />
            <div className='space-y-4 md:flex md:gap-x-2 md:items-baseline md:justify-evenly'>
              <div className='space-y-1.5'>
                <label htmlFor='price'>قیمت برحسب تومان</label>
                <input
                  type='number'
                  name='price'
                  id='price'
                  className='input'
                  placeholder='0'
                  value={product.price}
                  onChange={(e) =>
                    dispatch(
                      changeProductItems({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className='space-y-1.5'>
                <label htmlFor='inStock'>موجودی</label>
                <input
                  type='number'
                  name='inStock'
                  id='inStock'
                  className='input'
                  placeholder='0'
                  value={product.inStock}
                  onChange={(e) =>
                    dispatch(
                      changeProductItems({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
              </div>
              <div className='space-y-1.5'>
                <label htmlFor='discount'>تخفیف برحسب درصد</label>
                <input
                  type='number'
                  name='discount'
                  id='discount'
                  className='input'
                  placeholder='0%'
                  value={product.discount}
                  onChange={(e) =>
                    dispatch(
                      changeProductItems({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    )
                  }
                />
              </div>
            </div>
            <div className='py-3 mx-auto space-y-8 w-fit md:w-full md:py-0 md:flex md:items-baseline md:justify-between'>
              {!id && <SelectCategories productPage />}
            </div>
            {optionsType === "colors" || product.colors.length > 0 ? (
              <AddColors />
            ) : optionsType === "sizes" || product.sizes.length > 0 ? (
              <AddSizes />
            ) : (
              ""
            )}
            <div className='text-sm space-y-1.5'>
              <span>ویژگی‌ها</span>
              <table className='w-full max-w-2xl mx-auto' ref={infoTableRef}>
                <thead className='bg-emerald-50 text-emerald-500'>
                  <tr className=''>
                    <th className='w-1/3  p-2.5'>نام</th>
                    <th>مقدار</th>
                  </tr>
                </thead>
                <tbody>
                  {!id &&
                    infoArray?.map((item, index) => (
                      <tr key={index} className='border-b-2 border-gray-100'>
                        <td className='p-2'>{item}</td>
                        <td
                          contentEditable='true'
                          suppressContentEditableWarning='true'
                          className='input my-0.5 text-right'
                        ></td>
                      </tr>
                    ))}
                  {id &&
                    product.info.map((item, index) => (
                      <tr key={index} className='border-b-2 border-gray-100'>
                        <td className='p-2'>{item[0]}</td>
                        <td
                          contentEditable='true'
                          suppressContentEditableWarning='true'
                          className='input my-0.5 text-right'
                        >
                          {item[1]}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className='text-sm space-y-1.5'>
              <span>مشخصات</span>
              <table
                className='w-full max-w-2xl mx-auto'
                ref={specificationTableRef}
              >
                <thead className='bg-fuchsia-50 text-fuchsia-500 '>
                  <tr>
                    <th className='w-1/3 p-2.5'>نام</th>
                    <th>مقدار</th>
                  </tr>
                </thead>
                <tbody>
                  {!id &&
                    specificationArray?.map((item, index) => (
                      <tr key={index} className='border-b-2 border-gray-100'>
                        <td className='p-2'>{item}</td>
                        <td
                          contentEditable='true'
                          suppressContentEditableWarning='true'
                          className='input my-0.5 text-right'
                        ></td>
                      </tr>
                    ))}
                  {id &&
                    product.specification.map((item, index) => (
                      <tr key={index} className='border-b-2 border-gray-100'>
                        <td className='p-2'>{item[0]}</td>
                        <td
                          contentEditable='true'
                          suppressContentEditableWarning='true'
                          className='input my-0.5 text-right'
                        >
                          {item[1]}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {id ? (
              <button
                className='px-6 mx-auto mt-8 rounded-3xl btn bg-amber-500'
                type='button'
                onClick={updateHandler}
              >
                بروزرسانی اطلاعات
              </button>
            ) : (
              <button
                className='px-6 mx-auto mt-8 bg-green-500 rounded-3xl btn'
                type='submit'
                disabled={isLoading}
              >
                {isLoading ? <Loading /> : "ثبت اطلاعات"}
              </button>
            )}
          </form>
        </section>
      </main>
    </>
  );
}

Product.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
