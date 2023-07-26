import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { mobileSchema } from 'utils'

import { useEditUserMutation } from 'services'

import { TextField, SubmitModalButton, Modal, HandleResponse } from 'components'

type UserMobileForm = { mobile: string }

interface Props {
  isShow: boolean
  onClose: () => void
  editedData: string
}

const UserMobileModal: React.FC<Props> = (props) => {
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
  } = useForm<UserMobileForm>({
    resolver: yupResolver(mobileSchema),
    defaultValues: { mobile: editedData ? editedData : '' },
  })

  //? Handlers
  const submitHander: SubmitHandler<UserMobileForm> = ({ mobile }) => {
    editUser({
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
          error={error}
          message={data?.msg}
          onSuccess={onClose}
        />
      )}

      <Modal isShow={isShow} onClose={onClose} effect='bottom-to-top'>
        <Modal.Content
          onClose={onClose}
          className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 '
        >
          <Modal.Header onClose={onClose}>
            ثبت و ویرایش شماره موبایل
          </Modal.Header>
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
                inputMode='tel'
              />

              <div className='py-3 border-t-2 border-gray-200 lg:pb-0 '>
                <SubmitModalButton isLoading={isLoading}>
                  ثبت اطلاعات
                </SubmitModalButton>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default UserMobileModal
