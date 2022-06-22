import { useGetDataQuery, usePostDataMutation } from "app/slices/fetchApiSlice";
import { openModal } from "app/slices/modalSlice";
import { BackButton, SelectCategories, FlexibleTR, Loading } from "components";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Details() {
  const dispatch = useDispatch();

  //? Local Store
  const [category, setCategory] = useState({});
  const [categoryDetails, setCategoryDetails] = useState({});
  const [info, setInfo] = useState();
  const [specification, setSpecification] = useState();

  //? Initial Details
  useEffect(() => {
    if (categoryDetails) {
      setInfo(categoryDetails.info);
      setSpecification(categoryDetails.specification);
    } else {
      setInfo();
      setSpecification();
    }
  }, [categoryDetails?.category_id]);

  //? Store
  const { token } = useSelector((state) => state.auth);
  const { categories, parentCategory, mainCategory } = useSelector(
    (state) => state.categories
  );

  //? Get Details
  useEffect(() => {
    if (parentCategory) {
      setCategory(categories.find((item) => item.slug === parentCategory));
    }
  }, [parentCategory]);

  const GetDetails = ({ detailsID, setCategoryDetails }) => {
    const { data, isSuccess } = useGetDataQuery({
      url: `/api/details/${detailsID}`,
    });
    useEffect(() => {
      if (isSuccess) setCategoryDetails(data.details);
    }, [isSuccess]);

    return null;
  };

  //? Post Data Query
  const [
    postData,
    { data, isSuccess, isError, isLoading, error },
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
    }
    if (isError)
      dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "error",
          text: error?.data.err,
        })
      );
  }, [isSuccess, isError]);

  //? Handlers

  const submitHandler = async (e) => {
    e.preventDefault();

    if (info && specification) {
      await postData({
        url: "/api/details",
        body: {
          category_id: category._id,
          info,
          specification,
        },
        token,
      });
    } else {
      dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "error",
          text: "لطفا مشخصات و ویژگی ها را وارد کنید",
        })
      );
    }
  };

  return (
    <>
      {category?._id && (
        <GetDetails
          detailsID={category._id}
          setCategoryDetails={setCategoryDetails}
        />
      )}
      <BackButton backRoute='/admin'>مشخصات</BackButton>
      <div className='section-divide-y' />
      <div className='flex-1 p-3 max-w-xl mb-10 space-y-8 md:grid md:grid-cols-2 md:gap-x-12 md:items-baseline'>
        <SelectCategories />
      </div>
      <div className=' p-3'>
        {parentCategory && (
          <div className='space-y-6'>
            <div className='text-sm lg:text-sm'>
              <span> ویژگی‌های دسته‌بندی</span>{" "}
              <span className='text-green-500 text-base'>{category?.name}</span>
            </div>
            <form onSubmit={submitHandler}>
              <table className='w-full'>
                <thead className='bg-emerald-50'>
                  <tr className='text-emerald-500'>
                    <th>نام</th>
                    <th className='w-1/3 p-2.5'>مقدار</th>
                  </tr>
                </thead>
                <tbody>
                  <FlexibleTR
                    type='info'
                    values={info}
                    setValues={setInfo}
                    data={categoryDetails?.info}
                  />
                </tbody>
              </table>
            </form>
            <div className='text-sm lg:text-sm'>
              <span> مشخصات دسته‌بندی</span>{" "}
              <span className='text-green-500 text-base'>{category?.name}</span>
            </div>
            <form onSubmit={submitHandler}>
              <table className='w-full'>
                <thead className='bg-emerald-50'>
                  <tr className='text-emerald-500'>
                    <th>نام</th>
                    <th className='w-1/3 p-2.5'>مقدار</th>
                  </tr>
                </thead>
                <tbody>
                  <FlexibleTR
                    type='specification'
                    values={specification}
                    setValues={setSpecification}
                    data={categoryDetails?.specification}
                  />
                </tbody>
              </table>
              <button
                className='btn mx-auto w-56 rounded-md mt-8'
                type='submit'
              >
                {isLoading ? <Loading /> : "ثبت اطلاعات"}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

Details.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
