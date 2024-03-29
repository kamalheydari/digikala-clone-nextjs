import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { SubmitHandler } from 'react-hook-form'

import { useCreateSliderMutation } from '@/services'

import { SliderForm } from '@/components/forms'
import { DashboardLayout } from '@/components/Layouts'
import { HandleResponse } from '@/components/shared'
import { PageContainer } from '@/components/ui'

import type { NextPage } from 'next'
import type { ISliderForm } from '@/types'

const Create: NextPage = () => {
  // ? Assets
  const { query, back } = useRouter()
  const categoryName = query?.category_name
  const categoryId = query?.categoryId as string

  // ? Queries
  //*     Create Slider
  const [createSlider, { data, isSuccess, isLoading, error, isError }] = useCreateSliderMutation()

  // ? Handlers
  const createHandler: SubmitHandler<ISliderForm> = (data) => {
    const { image, isPublic, title, uri } = data
    createSlider({
      body: { category_id: categoryId, image, isPublic, title, uri },
    })
  }

  const onSuccess = () => back()

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
          <title>{'مدیریت' + ' | ' + 'اسلایدر جدید دسته بندی' + ' ' + categoryName}</title>
        </Head>

        <DashboardLayout>
          <PageContainer title={'اسلایدر جدید دسته بندی' + ' ' + categoryName}>
            <SliderForm mode="create" isLoadingCreate={isLoading} createHandler={createHandler} />
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Create), { ssr: false })
