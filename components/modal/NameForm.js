import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validation from "utils/validation";

import { updateUser } from "app/slices/user.slice";
import { useEditUserMutation } from "app/api/userApi";
import { showAlert } from "app/slices/alert.slice";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "app/slices/modal.slice";

import { Loading, CloseModal, ModalWrapper, Input } from "components";

export default function NameForm() {
  const dispatch = useDispatch();

  //? Store
  const { editedData, title, isShow, type } = useSelector(
    (state) => state.modal
  );

  //? Edit User Query
  const [
    editUser,
    { data, isSuccess, isLoading, isError, error },
  ] = useEditUserMutation();

  //? Handle Edit User Response
  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(data.user));
      dispatch(closeModal());
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
    reset,
  } = useForm({
    resolver: yupResolver(validation.nameSchema),
  });

  //? Handlers
  const submitHander = async ({ name }) => {
    editUser({
      body: { name },
    });
  };

  return (
    <ModalWrapper isShow={isShow && type === "edit-name"}>
      <div
        className={`
  ${
    isShow ? "bottom-0 lg:top-44" : "-bottom-full lg:top-60"
  } w-full h-full lg:h-fit lg:max-w-3xl 
   fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
        <div className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5'>
          <div className='flex justify-between py-2 border-b-2 border-gray-200'>
            <span className='text-sm'>{title}</span>
            <CloseModal />
          </div>
          <p className='text-sm'>
            لطفا اطلاعات شناسایی شامل نام و نام خانوادگی را وارد کنید.
          </p>

          <form
            className='flex flex-col justify-between flex-1 gap-y-5 '
            onSubmit={handleSubmit(submitHander)}
          >
            <Input
              label='نام و نام خانوادگی'
              register={register}
              errors={formErrors.name}
              name='name'
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
