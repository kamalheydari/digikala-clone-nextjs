import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import {
  BigLoading,
  CategoryForm,
  ConfirmUpdateModal,
  DashboardLayout,
  HandleResponse,
  PageContainer,
} from 'components'

import { useDisclosure } from 'hooks'

import { useGetCategoriesQuery, useUpdateCategoryMutation } from 'services'

import { SubmitHandler } from 'react-hook-form'

import type { NextPage } from 'next'
import type { DataModels, ICategoryForm } from 'types'

const Edit: NextPage = () => {
  //? Assets
  const { query, push } = useRouter()
  const id = query.id as string
  const parentId = query.parent_id as string

  const initialUpdataInfo = {} as DataModels.ICategory

  //? Modals
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? States
  const [updateInfo, setUpdateInfo] =
    useState<DataModels.ICategory>(initialUpdataInfo)

  //? Queries
  //*   Get Categories
  const { isLoading: isLoading_get, selectedCategory } = useGetCategoriesQuery(
    undefined,
    {
      selectFromResult: ({ data, isLoading }) => ({
        selectedCategory: data?.categories.find(
          (category) => category._id === id
        ),
        isLoading,
      }),
    }
  )

  //*   Update Category
  const [
    updateCategory,
    {
      data: data_update,
      isSuccess: isSuccess_update,
      isError: isError_update,
      error: error_update,
      isLoading: isLoading_update,
    },
  ] = useUpdateCategoryMutation()

  //? Handlers
  const updateHandler: SubmitHandler<ICategoryForm> = (data) => {
    setUpdateInfo((prev) => ({ ...prev, ...selectedCategory, ...data }))
    confirmUpdateModalHandlers.open()
  }

  const onConfirm = () => {
    updateCategory({
      id,
      body: updateInfo,
    })
  }

  const onCancel = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  const onSuccess = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
    push(`/admin/categories${parentId ? `?parent_id=${parentId}` : ''}`)
  }

  const onError = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  return (
    <>
      {/* Handle Update Category Response */}
      {(isSuccess_update || isError_update) && (
        <HandleResponse
          isError={isError_update}
          isSuccess={isSuccess_update}
          error={error_update}
          message={data_update?.msg}
          onSuccess={onSuccess}
          onError={onError}
        />
      )}

      <ConfirmUpdateModal
        title='دسته بندی'
        isLoading={isLoading_update}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />

      <main>
        <Head>
          <title>{'مدیریت' + ' | ' + 'ویرایش دسته بندی'}</title>
        </Head>

        <DashboardLayout>
          <PageContainer title='ویرایش دسته بندی'>
            {isLoading_get ? (
              <div className='px-3 py-20'>
                <BigLoading />
              </div>
            ) : selectedCategory ? (
              <CategoryForm
                mode='edit'
                isLoading={isLoading_update}
                selectedCategory={selectedCategory}
                updateHandler={updateHandler}
              />
            ) : null}
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Edit), { ssr: false })
