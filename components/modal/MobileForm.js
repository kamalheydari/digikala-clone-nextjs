import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validation from "utils/validation";

import { useEditUserMutation } from "app/api/userApi";
import { updateUser } from "app/slices/user.slice";
import { showAlert } from "app/slices/alert.slice";

import {
  Loading,
  CloseModal,
  ModalWrapper,
  Input,
} from "components";

export default function MobileForm({
  title,
  token,
  dispatch,
  closeModal,
  editedData,
  isShow,
}) {
  //? Patch Data
  const [
    editUser,
    { data, isSuccess, isLoading, error, isError },
  ] = useEditUserMutation();

  //? Handle Edit User Response
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(data.user));
      dispatch(closeModal());
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
    reset,setFocus
  } = useForm({
    resolver: yupResolver(validation.mobileSchema),
  });

  
  //? Focus On Mount
  useEffect(() => {
    setFocus("mobile");
  }, []);


  //? Handlers
  const submitHander = async ({ mobile }) => {
    editUser({
      body: { mobile },
      token,
    });
  };

  return (
    <ModalWrapper isShow={isShow}>
      <div
        className={`
  ${
    isShow ? "bottom-0 lg:top-44" : "-bottom-full lg:top-60"
  } w-full h-[90vh] lg:h-fit lg:max-w-3xl fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
        <div className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5'>
          <div className='flex justify-between py-2 border-b-2 border-gray-200'>
            <span className='text-sm'>{title}</span>
            <CloseModal />
          </div>
          <p className='text-sm'>لطفا شماره تلفن همراه خود را وارد کنید.</p>
          <form
            className='flex flex-col justify-between flex-1 gap-y-5'
            onSubmit={handleSubmit(submitHander)}
          >
            <Input
              label='شماره موبایل'
              register={register}
              errors={formErrors.mobile}
              name='mobile'
              type='text'
              defaultValue={editedData}
            />

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
