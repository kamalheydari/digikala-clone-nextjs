import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useEditUserMutation } from "app/api/userApi";
import { showAlert } from "app/slices/alert.slice";

import { useForm } from "react-hook-form";
import validation from "utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";

let iranCity = require("iran-city");

import {
  TextField,
  DisplayError,
  SubmitModalBtn,
  Combobox,
  Modal,
} from "components";

import useUserInfo from "hooks/useUserInfo";

export default function AddressForm(props) {
  //? Porps
  const { isShow, onClose,address } = props;

  //? Assets
  const dispatch = useDispatch();
  let AllProvinces = iranCity.allProvinces();

  //? Get User Data
  const { userInfo } = useUserInfo();

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
    defaultValues: address
  });

  //? Edit User-Info Query
  const [
    editUser,
    { data, isSuccess, isLoading, isError },
  ] = useEditUserMutation();

  //? Re-Renders
  //* Handle Edit User-Info Response
  useEffect(() => {
    if (isSuccess) {
      onClose();
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

  //* Change cities beside on province
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

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect='bottom-to-top'>
      <Modal.Content className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 '>
        <Modal.Header>ثبت و ویرایش آدرس</Modal.Header>
        <Modal.Body>
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
              />

              <TextField
                label='کد پستی'
                control={control}
                errors={formErrors.postalCode}
                name='postalCode'
                type='number'
              />
            </div>

            <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
              <SubmitModalBtn isLoading={isLoading}>ثبت اطلاعات</SubmitModalBtn>
            </div>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
