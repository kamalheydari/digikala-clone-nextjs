import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import {
  DashboardLayout,
  HandleResponse,
  PageContainer,
  ProductsForm,
} from 'components'

import { useCreateProductMutation } from 'services'

import type { NextPage } from 'next'
import type { IProductForm } from 'types'

interface Props {}
const Create: NextPage<Props> = () => {
  //? Assets
  const { push } = useRouter()

  //? Queries
  //*   Create Product
  const [createProduct, { data, isSuccess, isLoading, isError, error }] =
    useCreateProductMutation()

  //? Handlers
  const createHandler = (data: IProductForm) => {
    console.log(data)
    createProduct({ body: data })
  }

  const onSuccess = () => {
    push('/admin/products')
  }

  return (
    <>
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.msg}
          onSuccess={onSuccess}
        />
      )}

      <main>
        <Head>
          <title>{'مدیریت' + ' | ' + 'محصول جدید'}</title>
        </Head>

        <DashboardLayout>
          <PageContainer title='محصول جدید'>
            <ProductsForm
              mode='create'
              isLoadingCreate={isLoading}
              createHandler={createHandler}
            />
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Create), { ssr: false })
