import { useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { nameSchema } from '@/utils'

import { useDisclosure } from '@/hooks'
import { useEditUserMutation } from '@/services'

import { Edit, Plus } from '@/icons'
import { HandleResponse } from '@/components/shared'
import { Modal, TextField, SubmitModalButton } from '@/components/ui'

type UserNameForm = { name: string }

interface Props {
  editedData?: string
}

const UserNameModal: React.FC<Props> = (props) => {
  // ? Props
  const { editedData } = props

  // ? Assets
  const [isShowNameModal, nameModalHandlers] = useDisclosure()

  // ? Edit User Query
  const [editUser, { data, isSuccess, isLoading, isError, error }] = useEditUserMutation()

  // ? Form Hook
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { errors: formErrors },
  } = useForm<UserNameForm>({
    resolver: yupResolver(nameSchema),
    defaultValues: { name: editedData || '' },
  })

  // ? Handlers
  const submitHander: SubmitHandler<UserNameForm> = ({ name }) =>
    editUser({
      body: { name },
    })

  // ? Re-Renders
  //*    Use useEffect to set focus after a delay when the modal is shown
  useEffect(() => {
    if (isShowNameModal) {
      const timeoutId = setTimeout(() => {
        setFocus('name')
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [isShowNameModal])

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
          onSuccess={nameModalHandlers.close}
        />
      )}

      {editedData ? (
        <Edit className="icon cursor-pointer" onClick={nameModalHandlers.open} />
      ) : (
        <Plus className="icon cursor-pointer" onClick={nameModalHandlers.open} />
      )}

      <Modal isShow={isShowNameModal} onClose={nameModalHandlers.close} effect="bottom-to-top">
        <Modal.Content
          onClose={nameModalHandlers.close}
          className="flex h-full flex-col gap-y-5 bg-white px-5 py-3 md:rounded-lg "
        >
          <Modal.Header onClose={nameModalHandlers.close}>ثبت و ویرایش اطلاعات شناسایی</Modal.Header>
          <Modal.Body>
            <p className="text-sm">لطفا اطلاعات شناسایی شامل نام و نام خانوادگی را وارد کنید.</p>

            <form className="flex flex-1 flex-col justify-between gap-y-5 " onSubmit={handleSubmit(submitHander)}>
              <TextField label="نام و نام خانوادگی" control={control} errors={formErrors.name} name="name" />

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

export default UserNameModal
