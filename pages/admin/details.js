import {
  addCategory,
  loadDetails,
  resetDetails,
} from "app/slices/detailsSlice";
import { useGetDataQuery, usePostDataMutation } from "app/slices/fetchApiSlice";
import { openModal } from "app/slices/modalSlice";
import { BackButton, DetailsList, Loading, SelectCategories } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Details() {
  const dispatch = useDispatch();

  //? Store
  const { token } = useSelector((state) => state.auth);
  const { categories, parentCategory, mainCategory } = useSelector(
    (state) => state.categories
  );
  const { category, info, specification, details_id } = useSelector(
    (state) => state.details
  );

  //? Set Category
  useEffect(() => {
    if (parentCategory) {
      dispatch(resetDetails());
      dispatch(
        addCategory(categories.find((item) => item.slug === parentCategory))
      );
    }
  }, [parentCategory]);

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
        type: "confirm-details",
        title: "مشخصات و ویژگی ها",
      })
    );
  };

  const GetDetails = ({ cateforyID }) => {
    const { data, isSuccess } = useGetDataQuery({
      url: `/api/details/${cateforyID}`,
    });

    useEffect(() => {
      if (isSuccess && data.details)
        dispatch(
          loadDetails({
            details_id: data.details._id,
            info: data.details.info,
            specification: data.details.specification,
          })
        );
    }, [isSuccess]);

    return null;
  };

  return (
    <>
      {category?._id && <GetDetails cateforyID={category._id} />}
      <BackButton backRoute='/admin'>مشخصات</BackButton>
      <div className='section-divide-y' />
      <div className='flex-1 p-3 max-w-xl mb-10 space-y-8 md:grid md:grid-cols-2 md:gap-x-12 md:items-baseline'>
        <SelectCategories />
      </div>
      <div className='p-3'>
        {parentCategory && (
          <div>
            <form className='space-y-6' onSubmit={submitHandler}>
              <DetailsList category={category} type='info' data={info} />
              <DetailsList
                category={category}
                type='specification'
                data={specification}
              />
              <div className='flex gap-x-4 justify-center'>
                {info.length !== 0 ? (
                  <>
                    <button
                      className='btn px-6 bg-amber-500 rounded-md mt-8'
                      type='button'
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
          </div>
        )}
      </div>
    </>
  );
}

Details.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
