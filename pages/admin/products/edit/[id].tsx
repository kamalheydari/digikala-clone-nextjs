import { useRouter } from 'next/router'
import { useState } from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

import {
  BigLoading,
  ConfirmUpdateModal,
  DashboardLayout,
  HandleResponse,
  PageContainer,
  ProductsForm,
} from 'components'

import { useDisclosure } from 'hooks'

import { SubmitHandler } from 'react-hook-form'

import { useGetSingleProductQuery, useUpdateProductMutation } from 'services'

import type { IProduct, IProductForm } from 'types'

interface Props {}
const Edit: NextPage<Props> = () => {
  //? Assets
  const { query, back } = useRouter()
  const id = query.id as string

  const initialUpdataInfo = {} as IProduct

  //? Modals
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? States
  const [updateInfo, setUpdateInfo] = useState<IProduct>(initialUpdataInfo)

  //? Queries
  //*    Get Product
  const { data: selectedProduct, isLoading: isLoadingGetSelectedProduct } =
    useGetSingleProductQuery({ id })

  //*   Update Product
  const [
    updateProduct,
    {
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateProductMutation()

  //? Handlers
  const updateHandler: SubmitHandler<IProductForm> = (data) => {
    const {
      title,
      description,
      colors,
      sizes,
      discount,
      price,
      info,
      specification,
      images,
    } = data
    setUpdateInfo((prev) => ({
      ...prev,
      ...selectedProduct,
      title,
      description,
      colors,
      sizes,
      discount,
      price,
      info,
      specification,
      images,
    }))
    confirmUpdateModalHandlers.open()
  }

  const onConfirmUpdate = () => {
    updateProduct({
      id,
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

  return (
    <>
      <ConfirmUpdateModal
        title='محصول'
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
          <title>{'مدیریت' + ' | ' + 'ویرایش محصول'}</title>
        </Head>

        <DashboardLayout>
          <PageContainer title='ویرایش محصول'>
            {isLoadingGetSelectedProduct ? (
              <div className='px-3 py-20'>
                <BigLoading />
              </div>
            ) : selectedProduct ? (
              <ProductsForm
                mode='edit'
                isLoadingUpdate={isLoadingUpdate}
                updateHandler={updateHandler}
                selectedProduct={selectedProduct}
              />
            ) : null}
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Edit), { ssr: false })
