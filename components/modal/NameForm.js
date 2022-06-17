import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validation from "utils/validation";

import { usePatchDataMutation } from "app/slices/fetchApiSlice";
import { updateUser } from "app/slices/authSlice";

import { DisplayError, Loading, CloseModal } from "components";

export default function NameForm({ title, token, dispatch, closeModal }) {
  //? Patch Data
  const [patchData, { data, isSuccess, isLoading }] = usePatchDataMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateUser(data.user));
      dispatch(closeModal());
      reset();
    }
  }, [isSuccess]);

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
    patchData({
      url: "/api/user",
      body: { name },
      token,
    });
  };

  return (
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
        <div className='space-y-3 '>
          <label
            className='text-xs text-gray-700 lg:text-sm md:min-w-max'
            htmlFor='name'
          >
            نام و نام خانوادگی
          </label>
          <input
            className='input sm:max-w-sm lg:max-w-full '
            type='text'
            name='name'
            id='name'
            {...register("name")}
          />
          <DisplayError errors={formErrors.name} />
        </div>

        <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
          <button
            className='w-full max-w-xl mx-auto rounded-md btn lg:w-64 lg:ml-0'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "ثبت اطلاعات"}
          </button>
        </div>
      </form>
    </div>
  );
}
