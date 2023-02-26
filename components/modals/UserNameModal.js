import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validation from "utils/validation";

import { useEditUserMutation } from "app/api/userApi";
import { useDispatch } from "react-redux";

import { TextField, SubmitModalBtn, Modal, HandleResponse } from "components";

export default function UserNameModal(props) {
  //? Props
  const { isShow, onClose, editedData } = props;

  //? Edit User Query
  const [
    editUser,
    { data, isSuccess, isLoading, isError, error },
  ] = useEditUserMutation();

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(validation.nameSchema),
    defaultValues: { name: editedData ? editedData : "" },
  });

  //? Handlers
  const submitHander = async ({ name }) => {
    editUser({
      body: { name },
    });
  };

  //? Render(s)
  return (
    <>
      {/* Handle Edit User Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.err}
          message={data?.msg}
          onSuccess={onClose}
        />
      )}
      <Modal isShow={isShow} onClose={onClose} effect='bottom-to-top'>
        <Modal.Content className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 '>
          <Modal.Header>ثبت و ویرایش اطلاعات شناسایی</Modal.Header>
          <Modal.Body>
            <p className='text-sm'>
              لطفا اطلاعات شناسایی شامل نام و نام خانوادگی را وارد کنید.
            </p>

            <form
              className='flex flex-col justify-between flex-1 gap-y-5 '
              onSubmit={handleSubmit(submitHander)}
            >
              <TextField
                label='نام و نام خانوادگی'
                control={control}
                errors={formErrors.name}
                name='name'
              />

              <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
                <SubmitModalBtn isLoading={isLoading}>
                  ثبت اطلاعات
                </SubmitModalBtn>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}