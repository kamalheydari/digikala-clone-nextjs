import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { SubmitHandler } from 'react-hook-form'

import { useCreateBannerMutation } from '@/services'

import { BannerForm } from '@/components/forms'
import { DashboardLayout } from '@/components/Layouts'
import { HandleResponse } from '@/components/shared'
import { PageContainer } from '@/components/ui'

import type { NextPage } from 'next'
import type { IBannerForm } from '@/types'

interface Props {}

const Create: NextPage<Props> = () => {
  // ? Assets
  const { query, back } = useRouter()
  const categoryId = query?.categoryId as string

  // ? Queries
  //*     Create Banner
  const [createBanner, { data, isSuccess, isLoading, error, isError }] = useCreateBannerMutation()

  // ? Handlers
  const createHandler: SubmitHandler<IBannerForm> = (data) => {
    const { image, isPublic, title, type, uri } = data
    createBanner({
      body: { category_id: categoryId, image, isPublic, title, type, uri },
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
          <title>{'مدیریت' + ' | ' + 'بنر جدید'}</title>
        </Head>

        <DashboardLayout>
          <PageContainer title="بنر جدید">
            <BannerForm mode="create" isLoadingCreate={isLoading} createHandler={createHandler} />
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Create), { ssr: false })
