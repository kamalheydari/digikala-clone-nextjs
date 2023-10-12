import { useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { nameSchema } from 'utils'

import { useEditUserMutation } from 'services'

import { TextField, SubmitModalButton, Modal, HandleResponse } from 'components'
import { Edit, Plus } from 'icons'

import { useDisclosure } from 'hooks'

type UserNameForm = { name: string }

interface Props {
  editedData?: string
}

const UserNameModal: React.FC<Props> = (props) => {
  //? Props
  const { editedData } = props

  //? Assets
  const [isShowNameModal, nameModalHandlers] = useDisclosure()

  //? Edit User Query
  const [editUser, { data, isSuccess, isLoading, isError, error }] =
    useEditUserMutation()

  //? Form Hook
  const {
    handleSubmit,
    control,
    setFocus,
    formState: { errors: formErrors },
  } = useForm<UserNameForm>({
    resolver: yupResolver(nameSchema),
    defaultValues: { name: editedData ? editedData : '' },
  })

  //? Handlers
  const submitHander: SubmitHandler<UserNameForm> = ({ name }) =>
    editUser({
      body: { name },
    })

  //? Re-Renders
  //*    Use useEffect to set focus after a delay when the modal is shown
  useEffect(() => {
    if (isShowNameModal) {
      const timeoutId = setTimeout(() => {
        setFocus('name')
      }, 100)

      return () => clearTimeout(timeoutId)
    }
  }, [isShowNameModal])

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
          onSuccess={nameModalHandlers.close}
        />
      )}

      {editedData ? (
        <Edit
          className='cursor-pointer icon'
          onClick={nameModalHandlers.open}
        />
      ) : (
        <Plus
          className='cursor-pointer icon'
          onClick={nameModalHandlers.open}
        />
      )}

      <Modal
        isShow={isShowNameModal}
        onClose={nameModalHandlers.close}
        effect='bottom-to-top'
      >
        <Modal.Content
          onClose={nameModalHandlers.close}
          className='flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 '
        >
          <Modal.Header onClose={nameModalHandlers.close}>
            ثبت و ویرایش اطلاعات شناسایی
          </Modal.Header>
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

export default UserNameModal
