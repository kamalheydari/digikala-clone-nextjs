import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { resetSelectedCategories } from "app/slices/categorySlice";
import { usePostDataMutation } from "app/slices/fetchApiSlice";
import { openModal } from "app/slices/modalSlice";
import {
  changeProductItems,
  fetchDetails,
  fetchProduct,
  resetProduct,
} from "app/slices/productSlice";

import {
  Buttons,
  Colors,
  SelectCategories,
  Sizes,
  UploadImages,
  Loading,
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
  const { token } = useSelector((state) => state.auth);
  const { isConfirm } = useSelector((state) => state.modal);
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

  //? Post Data Query
  const [
    postData,
    { data, isSuccess, isLoading, isError, error },
  ] = usePostDataMutation();
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
      router.push("/admin/products");
      dispatch(resetSelectedCategories());
      dispatch(resetProduct());
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

  //? Edit Product
  const { id } = router.query;
  useEffect(() => {
    if (id) {
      dispatch(resetProduct());
      dispatch(fetchProduct(router.query.id));
    } else {
      dispatch(resetProduct());
    }
  }, [id]);

  //? Hanlders
  const handleSubmit = async (e) => {
    e.preventDefault();

    const infoArray = await getDetailsArray(infoTableRef);
    const specificationArray = await getDetailsArray(specificationTableRef);
    if (!category) console.log("y");
    postData({
      url: `/api/products`,
      token,
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

  return (
    <>
      <Buttons.Back backRoute='/admin'>محصول جدید</Buttons.Back>
      <div className='section-divide-y' />

      <div className='p-3 md:px-3 xl:px-8 2xl:px-10'>
        <form onSubmit={handleSubmit} className='space-y-10'>
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
          <UploadImages />
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
            <Colors />
          ) : optionsType === "sizes" || product.sizes.length > 0 ? (
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
              disabled={isConfirm}
            >
              {isConfirm ? <Loading /> : "بروزرسانی اطلاعات"}
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
      </div>
    </>
  );
}

Product.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
