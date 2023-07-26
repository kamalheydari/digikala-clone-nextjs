import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  BigLoading,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  DashboardLayout,
  HandleResponse,
  PageContainer,
  SliderForm,
} from 'components'

import { useDisclosure } from 'hooks'

import { SubmitHandler } from 'react-hook-form'

import {
  useDeleteSliderMutation,
  useGetSingleSliderQuery,
  useUpdateSliderMutation,
} from 'services'

import type { NextPage } from 'next'
import type { DataModels, ISliderForm } from 'types'

const Edit: NextPage = () => {
  //? Assets
  const { query, back } = useRouter()
  const sliderId = query?.id as string
  const sliderName = query?.slider_name

  const initialUpdataInfo = {} as DataModels.ISlider

  //? States
  const [updateInfo, setUpdateInfo] =
    useState<DataModels.ISlider>(initialUpdataInfo)

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? Queries
  //*   Get Slider
  const { data: selectedSlider, isLoading: isLoadingGetSelectedSlider } =
    useGetSingleSliderQuery({
      id: sliderId,
    })

  //*   Update Slider
  const [
    updateSlider,
    {
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateSliderMutation()

  //*   Delete Slider
  const [
    deleteSlider,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteSliderMutation()

  //? Handlers
  //*   Update
  const updateHandler: SubmitHandler<ISliderForm> = (data) => {
    setUpdateInfo((prev) => ({ ...prev, ...selectedSlider, ...data }))
    confirmUpdateModalHandlers.open()
  }

  const onConfirmUpdate = () => {
    updateSlider({
      id: sliderId,
      body: updateInfo,
    })
  }

  const onCancelUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  const onSuccessUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
    back()
  }

  const onErrorUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  //*   Delete
  const deleteHandler = () => confirmDeleteModalHandlers.open()

  const onConfirmDelete = () => deleteSlider({ id: sliderId })

  const onCancelDelete = () => confirmDeleteModalHandlers.close()

  const onSuccessDelete = () => {
    confirmDeleteModalHandlers.close()
    back()
  }

  const onErrorDelete = () => confirmDeleteModalHandlers.close()

  return (
    <>
      <ConfirmDeleteModal
        title='اسلایدر'
        isLoading={isLoadingDelete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />

      {(isSuccessDelete || isErrorDelete) && (
        <HandleResponse
          isError={isErrorDelete}
          isSuccess={isSuccessDelete}
          error={errorDelete}
          message={dataDelete?.msg}
          onSuccess={onSuccessDelete}
          onError={onErrorDelete}
        />
      )}

      <ConfirmUpdateModal
        title='اسلایدر'
        isLoading={isLoadingUpdate}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        onCancel={onCancelUpdate}
        onConfirm={onConfirmUpdate}
      />

      {(isSuccessUpdate || isErrorUpdate) && (
        <HandleResponse
          isError={isErrorUpdate}
          isSuccess={isSuccessUpdate}
          error={errorUpdate}
          message={dataUpdate?.msg}
          onSuccess={onSuccessUpdate}
          onError={onErrorUpdate}
        />
      )}

      <main>
        <Head>
          <title>
            {'مدیریت' + ' | ' + 'ویرایش اسلایدر' + ' ' + sliderName}
          </title>
        </Head>

        <DashboardLayout>
          <PageContainer title={'ویرایش اسلایدر' + ' ' + sliderName}>
            {isLoadingGetSelectedSlider ? (
              <div className='px-3 py-20'>
                <BigLoading />
              </div>
            ) : selectedSlider ? (
              <SliderForm
                mode='edit'
                selectedSlider={selectedSlider}
                updateHandler={updateHandler}
                isLoadingDelete={isLoadingDelete}
                isLoadingUpdate={isLoadingUpdate}
                deleteHandler={deleteHandler}
              />
            ) : null}
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default Edit
