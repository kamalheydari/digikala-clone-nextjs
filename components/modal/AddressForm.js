import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEditUserMutation } from "app/api/userApi";
import { showAlert } from "app/slices/alert.slice";
import { closeModal } from "app/slices/modal.slice";

import { useForm } from "react-hook-form";
import validation from "utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";

let iranCity = require("iran-city");

import {
  CloseModal,
  ModalWrapper,
  TextField,
  DisplayError,
  SubmitModalBtn,
  Combobox,
} from "components";

import useUserInfo from "hooks/useUserInfo";

export default function AddressForm() {
  const dispatch = useDispatch();
  let AllProvinces = iranCity.allProvinces();

  //? Get User Data
  const { userInfo } = useUserInfo();

  //? Store
  const { title, isShow, type } = useSelector((state) => state.modal);

  //? State
  const [cities, setCities] = useState([]);

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(validation.addressSchema),
    defaultValues: userInfo?.address
      ? { ...userInfo?.address }
      : { city: {}, province: {}, postalCode: "", street: "" },
  });

  //? Edit User-Info Query
  const [
    editUser,
    { data, isSuccess, isLoading, isError },
  ] = useEditUserMutation();

  //? Handle Edit User-Info Response
  useEffect(() => {
    if (isSuccess) {
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

  //? Change cities beside on province
  useEffect(() => {
    setValue("city", {});

    setCities(iranCity.citiesOfProvince(getValues("province")?.id));
    watch("province");
  }, [getValues("province")?.id]);

  useEffect(() => {
    if (userInfo?.address) setValue("city", userInfo.address.city);
  }, []);

  //? Handlers
  const submitHander = async (address) => {
    await editUser({
      body: { address },
    });
  };

  return (
    <ModalWrapper isShow={isShow && type === "edit-address"}>
      <div
        className={`
  ${
    isShow ? "bottom-0 lg:top-44" : "-bottom-full lg:top-60"
  } w-full h-full lg:h-[550px] lg:max-w-3xl fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
        <div className='flex flex-col h-full pl-2 pr-4 py-3 bg-white md:rounded-lg gap-y-5'>
          <div className='flex justify-between py-2 border-b-2 border-gray-200'>
            <h5>{title}</h5>
            <CloseModal />
          </div>
          <p>لطفا اطلاعات موقعیت مکانی خود را وارد کنید.</p>
          <form
            className='flex flex-col justify-between flex-1 overflow-y-auto pl-4'
            onSubmit={handleSubmit(submitHander)}
          >
            <div className='max-w-xl space-y-12 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-5 md:items-baseline '>
              <div className='space-y-2'>
                <Combobox
                  control={control}
                  name='province'
                  list={AllProvinces}
                  placeholder='لطفا استان خود را انتخاب کنید'
                />
                <DisplayError errors={formErrors.province?.name} />
              </div>

              <div className='space-y-2 '>
                <Combobox
                  control={control}
                  name='city'
                  list={cities}
                  placeholder='لطفا شهرستان خود را انتخاب کنید'
                />
                <DisplayError errors={formErrors.city?.name} />
              </div>

              <TextField
                label='کوچه و خیابان'
                control={control}
                errors={formErrors.street}
                name='street'
                type='text'
              />

              <TextField
                label='کد پستی'
                control={control}
                errors={formErrors.postalCode}
                name='postalCode'
                type='text'
              />
            </div>

            <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
              <SubmitModalBtn isLoading={isLoading}>ثبت اطلاعات</SubmitModalBtn>
            </div>
          </form>
        </div>
      </div>
    </ModalWrapper>
  );
}
