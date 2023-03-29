import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { mobileSchema } from 'utils'

import { useEditUserMutation } from 'services'

import { TextField, SubmitModalBtn, Modal, HandleResponse } from 'components'

export default function UserMobileModal(props) {
  //? Props
  const { isShow, onClose, editedData } = props

  //? Patch Data
  const [editUser, { data, isSuccess, isLoading, error, isError }] =
    useEditUserMutation()

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(mobileSchema),
    defaultValues: { mobile: editedData ? editedData : '' },
  })

  //? Handlers
  const submitHander = async ({ mobile }) => {
    await editUser({
      body: { mobile },
    })
  }

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
                direction='ltr'
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
  )
}
