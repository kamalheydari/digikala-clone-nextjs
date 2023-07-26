import { useEffect, useState } from 'react'

import { useEditUserMutation } from 'services'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { addressSchema } from 'utils'

import { useUserInfo } from 'hooks'

let iranCity = require('iran-city')

import {
  TextField,
  DisplayError,
  SubmitModalButton,
  Combobox,
  Modal,
  HandleResponse,
} from 'components'

import type { IAddress } from 'types'

interface Props {
  isShow: boolean
  onClose: () => void
  address: IAddress
}

const AddressModal: React.FC<Props> = (props) => {
  //? Porps
  const { isShow, onClose, address } = props

  //? Assets
  let AllProvinces = iranCity.allProvinces()

  //? Get User Data
  const { userInfo } = useUserInfo()

  //? State
  const [cities, setCities] = useState([])

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setValue,
    getValues,
    watch,
  } = useForm<IAddress>({
    resolver: yupResolver(addressSchema),
    defaultValues: address,
  })

  //? Edit User-Info Query
  const [editUser, { data, isSuccess, isLoading, isError, error }] =
    useEditUserMutation()

  //? Re-Renders
  //* Change cities beside on province
  useEffect(() => {
    setValue('city', {} as IAddress['city'])

    setCities(iranCity.citiesOfProvince(getValues('province')?.id))
    watch('province')
  }, [getValues('province')?.id])

  useEffect(() => {
    if (userInfo?.address) setValue('city', userInfo.address.city)
  }, [])

  //? Handlers
  const submitHander: SubmitHandler<IAddress> = (address) => {
    editUser({
      body: { address },
    })
  }

  //? Render(s)
  return (
    <>
      {/* Handle Edit Address Response */}
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
          <Modal.Header onClose={onClose}>ثبت و ویرایش آدرس</Modal.Header>
          <Modal.Body>
            <p>لطفا اطلاعات موقعیت مکانی خود را وارد کنید.</p>
            <form
              className='flex flex-col justify-between flex-1 pl-4 overflow-y-auto'
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
                  direction='ltr'
                  inputMode='numeric'
                />
              </div>

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

export default AddressModal
