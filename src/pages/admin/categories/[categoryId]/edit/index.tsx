import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useDisclosure } from '@/hooks'

import { useGetCategoriesQuery, useUpdateCategoryMutation } from '@/services'

import { SubmitHandler } from 'react-hook-form'

import { CategoryForm } from '@/components/forms'
import { DashboardLayout } from '@/components/Layouts'
import { ConfirmUpdateModal } from '@/components/modals'
import { HandleResponse } from '@/components/shared'
import { PageContainer, FullScreenLoading } from '@/components/ui'

import type { NextPage } from 'next'
import type { ICategory, ICategoryForm } from '@/types'

const Edit: NextPage = () => {
  // ? Assets
  const { query, push } = useRouter()
  const categoryId = query.categoryId as string
  const parentId = query.parent_id as string

  const initialUpdataInfo = {} as ICategory

  // ? Modals
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  // ? States
  const [updateInfo, setUpdateInfo] = useState<ICategory>(initialUpdataInfo)

  // ? Queries
  //*   Get Categories
  const { isLoading: isLoading_get, selectedCategory } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      selectedCategory: data?.categories.find((category) => category._id === categoryId),
      isLoading,
    }),
  })

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

  // ? Handlers
  const updateHandler: SubmitHandler<ICategoryForm> = (data) => {
    setUpdateInfo((prev) => ({ ...prev, ...selectedCategory, ...data }))
    confirmUpdateModalHandlers.open()
  }

  const onConfirm = () => {
    updateCategory({
      id: categoryId,
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
        title="دسته بندی"
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
          <PageContainer title="ویرایش دسته بندی">
            {isLoading_get ? (
              <div className="px-3 py-20">
                <FullScreenLoading />
              </div>
            ) : selectedCategory ? (
              <CategoryForm
                mode="edit"
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
