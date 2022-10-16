import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { updateUser } from "app/slices/user.slice";
import { useEditUserMutation } from "app/api/userApi";
import { showAlert } from "app/slices/alert.slice";

import { useForm } from "react-hook-form";
import validation from "utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Loading,
  CloseModal,
  ModalWrapper,
  Input,
  DisplayError,
} from "components";

import cityList from "utils/cityList";
import { provinces } from "utils/constatns";

export default function AddressForm({
  title,
  token,
  dispatch,
  closeModal,
  isShow,
}) {
  //? Store
  const { user } = useSelector((state) => state.user);

  //? Local State
  const [cities, setCities] = useState([]);

  //? Form Hook
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(validation.addressSchema),
    defaultValues: { ...user?.address },
  });

  //? Edit User-Info Query
  const [
    editUser,
    { data, isSuccess, isLoading, isError },
  ] = useEditUserMutation();

  //? Handle Edit User-Info Response
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
    if (isError)
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
  }, [isError]);

  //? Handlers
  const submitHander = async (address) => {
    await editUser({
      body: { address },
      token,
    });
  };

  useEffect(() => {
    setCities(cityList(getValues("provinces")));
  }, [getValues("provinces")]);

  return (
    <ModalWrapper isShow={isShow}>
      <div
        className={`
  ${
    isShow ? "bottom-0 lg:top-44" : "-bottom-full lg:top-60"
  } w-full h-[90vh] lg:h-fit lg:max-w-3xl fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
        <div className='flex flex-col h-full pl-2 pr-4 py-3 bg-white md:rounded-lg gap-y-5'>
          <div className='flex justify-between py-2 border-b-2 border-gray-200'>
            <h5>{title}</h5>
            <CloseModal />
          </div>
          <p>لطفا اطلاعات موقعیت مکانی خود را وارد کنید.</p>
          <form
            className='flex flex-col justify-between flex-1 gap-y-5 overflow-y-auto pl-4'
            onSubmit={handleSubmit(submitHander)}
          >
            <div className='max-w-xl space-y-16 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-10 md:items-baseline '>
              <div className='flex flex-col items-start justify-between gap-y-2'>
                <label
                  className='text-xs text-gray-700 lg:text-sm md:min-w-max'
                  htmlFor='provinces'
                >
                  استان
                </label>
                <select
                  className='border-2 rounded-sm py-0.5 px-3 outline-none w-56'
                  name='provinces'
                  id='provinces'
                  value={getValues("provinces")}
                  onChange={(e) =>
                    setValue("provinces", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                >
                  {provinces.map((item, index) => (
                    <option value={item[0]} key={index}>
                      {item[0]}
                    </option>
                  ))}
                </select>
                <DisplayError errors={formErrors.provinces} />
              </div>

              <div className='flex flex-col items-start justify-between gap-y-2'>
                <label
                  className='text-xs text-gray-700 lg:text-sm md:min-w-max'
                  htmlFor='city'
                >
                  شهرستان
                </label>
                <select
                  className='border-2 rounded-sm py-0.5 px-3 outline-none w-56'
                  name='city'
                  id='city'
                  value={getValues("city")}
                  onChange={(e) =>
                    setValue("city", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                >
                  {cities.map((item, index) => (
                    <option value={item[0]} key={index}>
                      {item[0]}
                    </option>
                  ))}
                </select>
                <DisplayError errors={formErrors.city} />
              </div>

              <Input
                label='کوچه و خیابان'
                register={register}
                errors={formErrors.street}
                name='street'
                type='text'
              />

              <Input
                label='کد پستی'
                register={register}
                errors={formErrors.postalCode}
                name='postalCode'
                type='text'
              />
            </div>

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
