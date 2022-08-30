import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { addOptionsType, loadDetails } from "app/slices/details.slice";
import { openModal } from "app/slices/modal.slice";
import { showAlert } from "app/slices/alert.slice";
import {
  useCreateDetailsMutation,
  useDeleteDetailsMutation,
  useGetDetailsQuery,
  useUpdateDetailsMutation,
} from "app/api/detailsApi";

import {
  Buttons,
  DetailsList,
  HandleDelete,
  HandleUpdate,
  Loading,
  ShowWrapper,
} from "components";

export default function DetailsPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  //? Store
  const { token } = useSelector((state) => state.user);
  const { isConfirm } = useSelector((state) => state.modal);
  const { categories } = useSelector((state) => state.categories);
  const {
    category,
    info,
    specification,
    details_id,
    optionsType,
  } = useSelector((state) => state.details);

  //? Get Details Query
  const {
    data: details,
    isFetching: detailsIsFetching,
    isSuccess: detailsIsSuccess,
  } = useGetDetailsQuery({
    id: router.query.id,
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
        optionsType: details?.details?.optionsType,
      })
    );
  }, [getCtegory, detailsIsSuccess]);

  //? Delete Details Query
  const [
    deleteDetails,
    {
      isSuccess: isSuccess_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
    },
  ] = useDeleteDetailsMutation();

  //? Update Details Query
  const [
    updateDetails,
    {
      data: data_update,
      isSuccess: isSuccess_update,
      isError: isError_update,
      error: error_update,
    },
  ] = useUpdateDetailsMutation();

  //? Create Details Query
  const [
    createDetails,
    { data, isSuccess, isError, isLoading, error },
  ] = useCreateDetailsMutation();

  //? Handle Create Details Response
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
      router.push("/admin/details");
    }
    if (isError)
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
  }, [isSuccess, isLoading]);

  //? Handlers
  const submitHandler = async (e) => {
    e.preventDefault();
    if (info.length !== 0 && specification.length !== 0) {
      await createDetails({
        body: {
          category_id: category._id,
          name: category.slug,
          info,
          specification,
          optionsType,
        },
        token,
      });
    } else {
      dispatch(
        showAlert({
          status: "error",
          title: "لطفا مشخصات و ویژگی ها را وارد کنید",
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
          optionsType,
        },
      })
    );
  };

  const handleOptionTypeChange = (e) => {
    dispatch(addOptionsType(e.target.value));
  };

  return (
    <main>
      <Head>
        <title>مدیریت | مشخصات</title>
      </Head>

      <HandleDelete
        deleteFunc={deleteDetails}
        isSuccess={isSuccess_delete}
        isError={isError_delete}
        error={error_delete}
        data={data_delete}
      />
      <HandleUpdate
        updateFunc={updateDetails}
        isSuccess={isSuccess_update}
        isError={isError_update}
        error={error_update}
        data={data_update}
      />

      <Buttons.Back backRoute='/admin/details'>
        مشخصات و ویژگی‌های دسته‌بندی
        <span> {category?.name}</span>
      </Buttons.Back>
      <div className='section-divide-y' />

      <ShowWrapper
        error={null}
        isError={null}
        refetch={null}
        isFetching={detailsIsFetching}
        isSuccess={detailsIsSuccess}
        dataLength={details ? 1 : 0}
        emptyElement={null}
      >
        <form className='p-3 space-y-6' onSubmit={submitHandler}>
          <div className='space-y-3'>
            <p className='mb-2'>نوع انتخاب :</p>
            <div className='flex items-center gap-x-1'>
              <input
                type='radio'
                checked={optionsType === "none"}
                name='optionsType'
                id='none'
                value='none'
                onChange={handleOptionTypeChange}
                className='ml-1'
              />
              <label htmlFor='none'>بدون حق انتخاب</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type='radio'
                checked={optionsType === "colors"}
                name='optionsType'
                id='colors'
                value='colors'
                onChange={handleOptionTypeChange}
                className='ml-1'
              />
              <label htmlFor='colors'>بر اساس رنگ</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type='radio'
                checked={optionsType === "sizes"}
                name='optionsType'
                id='sizes'
                value='sizes'
                onChange={handleOptionTypeChange}
                className='ml-1'
              />
              <label htmlFor='sizes'>بر اساس سایز</label>
            </div>
          </div>
          <DetailsList category={category} type='info' data={info} />
          <DetailsList
            category={category}
            type='specification'
            data={specification}
          />
          <div className='flex justify-center gap-x-4'>
            {details_id ? (
              <>
                <button
                  className='mt-8 rounded-3xl btn bg-amber-500'
                  type='button'
                  onClick={updateHandler}
                  disabled={isConfirm}
                >
                  {isConfirm ? <Loading /> : "بروزرسانی اطلاعات"}
                </button>
                <button
                  className='mt-8 bg-red-500 rounded-3xl btn'
                  type='button'
                  onClick={deleteHandler}
                >
                  حذف اطلاعات
                </button>
              </>
            ) : (
              <button
                className='mt-8 bg-green-500 rounded-3xl btn'
                type='submit'
              >
                {isLoading ? <Loading /> : "ثبت اطلاعات"}
              </button>
            )}
          </div>
        </form>
      </ShowWrapper>
    </main>
  );
}

DetailsPage.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};
