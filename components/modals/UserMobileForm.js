import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validation from "utils/validation";

import { useDispatch } from "react-redux";
import { useEditUserMutation } from "app/api/userApi";
import { showAlert } from "app/slices/alert.slice";

import { TextField, SubmitModalBtn, Modal } from "components";

export default function MobileForm(props) {
  //? Props
  const { isShow, onClose, editedData } = props;

  //? Assets
  const dispatch = useDispatch();

  //? Patch Data
  const [
    editUser,
    { data, isSuccess, isLoading, error, isError },
  ] = useEditUserMutation();

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(validation.mobileSchema),
    defaultValues: { mobile: editedData ? editedData : "" },
  });

  //? Handlers
  const submitHander = async ({ mobile }) => {
    await editUser({
      body: { mobile },
    });
  };

  //? Re-Renders
  //* Handle Edit User Response
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
    if (isError) {
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
    }
  }, [isError]);

  //? Render(s)
  return (
    <Modal isShow={isShow} onClose={onClose} effect='bottom-to-top'>
      <Modal.Content className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 '>
        <Modal.Header>ثبت و ویرایش شماره موبایل</Modal.Header>
        <Modal.Body>
          <p className='text-sm'>لطفا شماره تلفن همراه خود را وارد کنید.</p>
          <form
            className='flex flex-col justify-between flex-1 gap-y-5'
            onSubmit={handleSubmit(submitHander)}
          >
            <TextField
              label='شماره موبایل'
              control={control}
              errors={formErrors.mobile}
              name='mobile'
            />

            <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
              <SubmitModalBtn isLoading={isLoading}>ثبت اطلاعات</SubmitModalBtn>
            </div>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
