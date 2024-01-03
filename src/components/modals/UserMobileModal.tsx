import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { mobileSchema } from 'utils'

import { useEditUserMutation } from 'services'

import { TextField, SubmitModalButton, Modal, HandleResponse } from 'components'
import { useDisclosure } from 'hooks'
import { Edit, Plus } from 'icons'
import { useEffect } from 'react'

type UserMobileForm = { mobile: string }

interface Props {
  editedData?: string
}

const UserMobileModal: React.FC<Props> = (props) => {
  // ? Props
  const { editedData } = props

  // ? Assets
  const [isShowPhoneModal, phoneModalHandlers] = useDisclosure()

  // ? Patch Data
  const [editUser, { data, isSuccess, isLoading, error, isError }] = useEditUserMutation()

  // ? Form Hook
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { errors: formErrors },
  } = useForm<UserMobileForm>({
    resolver: yupResolver(mobileSchema),
    defaultValues: { mobile: editedData || '' },
  })

  // ? Handlers
  const submitHander: SubmitHandler<UserMobileForm> = ({ mobile }) => {
    editUser({
      body: { mobile },
    })
  }

  // ? Re-Renders
  //*    Use useEffect to set focus after a delay when the modal is shown
  useEffect(() => {
    if (isShowPhoneModal) {
      const timeoutId = setTimeout(() => {
        setFocus('mobile')
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [isShowPhoneModal])

  // ? Render(s)
  return (
    <>
      {/* Handle Edit User Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.msg}
          onSuccess={phoneModalHandlers.close}
          onError={phoneModalHandlers.close}
        />
      )}

      {editedData ? (
        <Edit className="icon cursor-pointer" onClick={phoneModalHandlers.open} />
      ) : (
        <Plus className="icon cursor-pointer" onClick={phoneModalHandlers.open} />
      )}

      <Modal isShow={isShowPhoneModal} onClose={phoneModalHandlers.close} effect="bottom-to-top">
        <Modal.Content
          onClose={phoneModalHandlers.close}
          className="flex h-full flex-col gap-y-5 bg-white px-5 py-3 md:rounded-lg "
        >
          <Modal.Header onClose={phoneModalHandlers.close}>ثبت و ویرایش شماره موبایل</Modal.Header>
          <Modal.Body>
            <p className="text-sm">لطفا شماره تلفن همراه خود را وارد کنید.</p>
            <form className="flex flex-1 flex-col justify-between gap-y-5" onSubmit={handleSubmit(submitHander)}>
              <TextField
                label="شماره موبایل"
                control={control}
                errors={formErrors.mobile}
                name="mobile"
                inputMode="tel"
              />

              <div className="border-t-2 border-gray-200 py-3 lg:pb-0 ">
                <SubmitModalButton isLoading={isLoading}>ثبت اطلاعات</SubmitModalButton>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default UserMobileModal
