import { resetSelectedCategories } from "app/slices/categorySlice";
import { usePostDataMutation } from "app/slices/fetchApiSlice";
import { openModal } from "app/slices/modalSlice";
import {
  addCategory,
  addInfo,
  addSpecification,
  changeProductItems,
  fetchDetails,
  resetProduct,
} from "app/slices/productSlice";
import {
  Buttons,
  Colors,
  SelectCategories,
  Sizes,
  UploadImages,
} from "components";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const { token } = useSelector((state) => state.auth);
  const { parentCategory, categories, category } = useSelector(
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

  //? Post Data Query
  const [postData, { data, isSuccess, isError, error }] = usePostDataMutation();
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "success",
          text: data.msg,
        })
      );
      dispatch(resetSelectedCategories());
      dispatch(resetProduct());
      router.push("/admin/products");
    }
    if (isError) {
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

  //? Hanlders
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addInfo(getDetailsArray(infoTableRef)));
    dispatch(addSpecification(getDetailsArray(specificationTableRef)));
    dispatch(addCategory(category));

    postData({ url: `/api/products`, token, body: { ...product } });
  };

  return (
    <>
      <Buttons.Back backRoute='/admin'>محصول جدید</Buttons.Back>
      <div className='section-divide-y' />

      <div className='p-3'>
        <form onSubmit={handleSubmit} className='space-y-10'>
          <div className='space-y-1.5'>
            <label
              className='text-xs text-gray-700 lg:text-sm md:min-w-max'
              htmlFor='title'
            >
              عنوان
            </label>
            <input
              type='text'
              className='input text-right'
              name='title'
              id='title'
              onChange={(e) => dispatch(changeProductItems(e))}
            />
          </div>
          <div className='space-y-1.5'>
            <label
              className='text-xs text-gray-700 lg:text-sm md:min-w-max'
              htmlFor='description'
            >
              معرفی
            </label>
            <textarea
              cols='30'
              rows='4'
              type='text'
              className='input text-right'
              name='description'
              id='description'
              onChange={(e) => dispatch(changeProductItems(e))}
            />
          </div>
          <UploadImages />
          <div className='space-y-4 md:flex md:gap-x-2 md:items-baseline md:justify-evenly'>
            <div className='space-y-1.5'>
              <label
                className='text-xs text-gray-700 lg:text-sm md:min-w-max'
                htmlFor='price'
              >
                قیمت برحسب تومان
              </label>
              <input
                type='number'
                name='price'
                id='price'
                className='input'
                placeholder='0'
                onChange={(e) => dispatch(changeProductItems(e))}
              />
            </div>
            <div className='space-y-1.5'>
              <label
                className='text-xs text-gray-700 lg:text-sm md:min-w-max'
                htmlFor='inStock'
              >
                موجودی
              </label>
              <input
                type='number'
                name='inStock'
                id='inStock'
                className='input'
                placeholder='0'
                onChange={(e) => dispatch(changeProductItems(e))}
              />
            </div>
            <div className='space-y-1.5'>
              <label
                className='text-xs text-gray-700 lg:text-sm md:min-w-max'
                htmlFor='discount'
              >
                تخفیف برحسب درصد
              </label>
              <input
                type='number'
                name='discount'
                id='discount'
                className='input'
                placeholder='0%'
                onChange={(e) => dispatch(changeProductItems(e))}
              />
            </div>
          </div>
          <div className='space-y-8 py-3 mx-auto w-fit md:w-full md:py-0  md:flex md:items-baseline md:justify-between'>
            <SelectCategories productPage />
          </div>
          {optionsType === "colors" ? (
            <Colors />
          ) : optionsType === "sizes" ? (
            <Sizes />
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
                {infoArray?.map((item, index) => (
                  <tr key={index} className='border-b-2 border-gray-100'>
                    <td className='p-2'>{item}</td>
                    <td
                      contentEditable='true'
                      className='input my-0.5 text-right'
                    ></td>
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
                {specificationArray?.map((item, index) => (
                  <tr key={index} className='border-b-2 border-gray-100'>
                    <td className='p-2'>{item}</td>
                    <td
                      contentEditable='true'
                      className='input my-0.5 text-right'
                    ></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            className='btn mx-auto px-6 bg-green-500 rounded-md mt-8'
            type='submit'
          >
            {/* {isLoading ? <Loading /> : "ثبت اطلاعات"} */}
            ثبت اطلاعات
          </button>
        </form>
      </div>
    </>
  );
}

Product.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
