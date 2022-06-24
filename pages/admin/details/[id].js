import { useEffect } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { loadDetails } from "app/slices/detailsSlice";
import { useGetDataQuery, usePostDataMutation } from "app/slices/fetchApiSlice";
import { openModal } from "app/slices/modalSlice";

import { BackButton, BigLoading, DetailsList, Loading } from "components";

export default function DetailsPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  //? Store
  const { token } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { category, info, specification, details_id } = useSelector(
    (state) => state.details
  );

  //? Get Details
  const { data: details, isLoading: getDetailsIsLoading } = useGetDataQuery({
    url: `/api/details/${router.query.id}`,
  });

  //? Load Details Store
  const getCtegory = categories.find((item) => item._id === router.query.id);
  useEffect(() => {
    dispatch(
      loadDetails({
        category: getCtegory,
        details_id: details?.details?._id,
        info: details?.details?.info,
        specification: details?.details?.specification,
      })
    );
  }, [getCtegory, getDetailsIsLoading]);

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
      router.reload();
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
  }, [isSuccess, isLoading]);

  //? Handlers
  const submitHandler = async (e) => {
    e.preventDefault();
    if (info.length !== 0 && specification.length !== 0) {
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

  const deleteHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        id: details_id,
        type: "confirm-delete-details",
        title: "مشخصات و ویژگی ها",
      })
    );
  };

  const updateHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        id: details_id,
        type: "confirm-update-details",
        title: "مشخصات و ویژگی های",
        editedData: {
          category_id: category._id,
          info,
          specification,
        },
      })
    );
  };

  return (
    <>
      <BackButton backRoute='/admin/details'>
        مشخصات و ویژگی‌های دسته‌بندی
        <span> {category?.name}</span>
      </BackButton>
      <div className='section-divide-y' />
      {getDetailsIsLoading ? (
        <div className='px-3 py-20'>
          <BigLoading />
        </div>
      ) : (
        <form className='space-y-6 p-3' onSubmit={submitHandler}>
          <DetailsList category={category} type='info' data={info} />
          <DetailsList
            category={category}
            type='specification'
            data={specification}
          />
          <div className='flex gap-x-4 justify-center'>
            {details_id ? (
              <>
                <button
                  className='btn px-6 bg-amber-500 rounded-md mt-8'
                  type='button'
                  onClick={updateHandler}
                >
                  بروزرسانی اطلاعات
                </button>
                <button
                  className='btn px-6 bg-red-500 rounded-md mt-8'
                  type='button'
                  onClick={deleteHandler}
                >
                  حذف اطلاعات
                </button>
              </>
            ) : (
              <button
                className='btn px-6 bg-green-500 rounded-md mt-8'
                type='submit'
              >
                {isLoading ? <Loading /> : "ثبت اطلاعات"}
              </button>
            )}
          </div>
        </form>
      )}
    </>
  );
}

DetailsPage.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};