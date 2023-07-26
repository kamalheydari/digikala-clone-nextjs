import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  CategoryForm,
  DashboardLayout,
  HandleResponse,
  PageContainer,
} from 'components'

import { SubmitHandler } from 'react-hook-form'

import { useCreateCategoryMutation } from 'services'

import type { NextPage } from 'next'
import type { ICategoryForm } from 'types'

const Create: NextPage = () => {
  //? Assets
  const { query, push } = useRouter()
  const parentId = query.parent_id as string
  const parentLvl = query.parent_lvl ? +query.parent_lvl : 0

  //? Queries
  //*   Create Category
  const [createCtegory, { data, isSuccess, isLoading, error, isError }] =
    useCreateCategoryMutation()

  //? Handlers
  const createHandler: SubmitHandler<ICategoryForm> = (data) => {
    const { name, slug, image, colors } = data
    createCtegory({
      body: {
        name,
        parent: parentId || '',
        slug: slug.trim().split(' ').join('-'),
        image,
        colors,
        level: parentLvl,
      },
    })
  }

  const onSuccess = () => {
    push(`/admin/categories${parentId ? `?parent_id=${parentId}` : ''}`)
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
          <title>{'مدیریت' + ' | ' + 'دسته بندی جدید'}</title>
        </Head>

        <DashboardLayout>
          <PageContainer title='دسته بندی جدید'>
            <CategoryForm
              mode='create'
              isLoading={isLoading}
              parentLvl={parentLvl}
              createHandler={createHandler}
            />
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Create), { ssr: false })
