import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import {
  BannerForm,
  BigLoading,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  DashboardLayout,
  HandleResponse,
  PageContainer,
} from 'components'

import { useDisclosure } from 'hooks'

import {
  useDeleteBannerMutation,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} from 'services'

import { SubmitHandler } from 'react-hook-form'

import type { NextPage } from 'next'
import type { DataModels, IBannerForm } from 'types'

const Edit: NextPage = () => {
  //? Assets
  const { query, back } = useRouter()
  const bannerId = query?.id as string
  const bannerName = query?.banner_name

  const initialUpdataInfo = {} as DataModels.IBanner

  //? Modals
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()

  //? States
  const [updateInfo, setUpdateInfo] =
    useState<DataModels.IBanner>(initialUpdataInfo)

  //? Queries
  //*   Get Banner
  const { data: selectedBanner, isLoading: isLoadingGetSelectedBanner } =
    useGetSingleBannerQuery({
      id: bannerId,
    })

  //*   Update Banner
  const [
    updateBanner,
    {
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateBannerMutation()

  //*   Delete Banner
  const [
    deleteBanner,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteBannerMutation()

  //? Handlers
  //*   Update
  const updateHandler: SubmitHandler<IBannerForm> = (data) => {
    setUpdateInfo((prev) => ({ ...prev, ...selectedBanner, ...data }))
    confirmUpdateModalHandlers.open()
  }

  const onConfirmUpdate = () => {
    updateBanner({
      id: bannerId,
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

  const onConfirmDelete = () => deleteBanner({ id: bannerId })

  const onCancelDelete = () => confirmDeleteModalHandlers.close()

  const onSuccessDelete = () => {
    confirmDeleteModalHandlers.close()
    back()
  }

  const onErrorDelete = () => confirmDeleteModalHandlers.close()

  return (
    <>
      <ConfirmDeleteModal
        title='بنر'
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
        title='بنر'
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
          <title>{'مدیریت' + ' | ' + 'ویرایش بنر' + ' ' + bannerName}</title>
        </Head>

        <DashboardLayout>
          <PageContainer title={'ویرایش بنر' + ' ' + bannerName}>
            {isLoadingGetSelectedBanner ? (
              <div className='px-3 py-20'>
                <BigLoading />
              </div>
            ) : selectedBanner ? (
              <BannerForm
                mode='edit'
                selectedBanner={selectedBanner}
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

export default dynamic(() => Promise.resolve(Edit), { ssr: false })
