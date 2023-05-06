import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'

import {
  BigLoading,
  Button,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  ControlledCheckbox,
  DashboardLayout,
  HandleResponse,
  PageContainer,
  TextField,
  UploadImage,
} from 'components'

import { useDisclosure } from 'hooks'

import { useForm } from 'react-hook-form'

import {
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} from 'services'
import { yupResolver } from '@hookform/resolvers/yup'
import { bannerSchema } from 'utils'

function Banner() {
  //? Assets
  const { query, back } = useRouter()
  const defaultValues = {
    image: { url: '' },
    title: '',
    uri: '',
    public: true,
    type: 'one',
  }

  const mode = query?.params?.[0]
  const categoryName = query?.category_name
  const categoryId = query?.category_id
  const bannerId = query?.banner_id
  const bannerName = query?.banner_name

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? States
  const [deleteInfo, setDeleteInfo] = useState({
    id: '',
  })
  const [updateInfo, setUpdateInfo] = useState({
    id: '',
    editedData: {},
  })

  //? Hook Form
  const {
    control,
    getValues,
    reset,
    register,
    setValue,
    handleSubmit,
    trigger,
    formState: { errors: formErrors },
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(bannerSchema),
  })

  //? Queries
  //*     Create Banner
  const [
    createBanner,
    {
      data: data_create,
      isSuccess: isSuccess_create,
      isLoading: isLoading_create,
      error: error_create,
      isError: isError_create,
    },
  ] = useCreateBannerMutation()

  //*   Get Banner
  const { data: data_get, isLoading: isLoading_get } = useGetSingleBannerQuery(
    {
      id: bannerId,
    },
    { skip: !bannerId }
  )

  //*   Update Banner
  const [
    updateBanner,
    {
      data: data_update,
      isSuccess: isSuccess_update,
      isError: isError_update,
      error: error_update,
      isLoading: isLoading_update,
    },
  ] = useUpdateBannerMutation()

  //*   Delete Banner
  const [
    deleteBanner,
    {
      isSuccess: isSuccess_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
      isLoading: isLoading_delete,
    },
  ] = useDeleteBannerMutation()

  //? Re-Renders
  useEffect(() => {
    if (data_get)
      reset({
        ...data_get,
      })
  }, [data_get])

  //? Handlers
  const submitHander = (banner) => {
    createBanner({
      body: { category_id: categoryId, ...banner },
    })
  }

  const updateHandler = async () => {
    await trigger(['title', 'image.url'])

    if (Object.keys(formErrors).length === 0) {
      setUpdateInfo({
        id: data_get?._id,
        editedData: {
          ...watch(),
        },
      })

      confirmUpdateModalHandlers.open()
    }
  }

  const deleteHandler = () => {
    setDeleteInfo({ ...deleteInfo, id: data_get?._id })
    confirmDeleteModalHandlers.open()
  }

  const handleAddUploadedImageUrl = (url) => setValue('image.url', url)

  //? Local Components
  const RadioButtons = ({ name }) => (
    <div className='flex items-center gap-8 mb-5'>
      <label className='inline-flex items-center gap-x-2'>
        <input
          className='w-5 h-5 text-red-600'
          type='radio'
          value='one'
          {...register(name)}
        />
        <span className='ml-2 text-gray-700'>نوع اول</span>
      </label>
      <label className='inline-flex items-center gap-x-2'>
        <input
          className='w-5 h-5 text-red-600'
          type='radio'
          value='two'
          {...register(name)}
        />
        <span className='ml-2 text-gray-700'>نوع دوم</span>
      </label>
    </div>
  )

  //? Render(s)
  return (
    <>
      {/* Handle Create Product Response */}
      {(isSuccess_create || isError_create) && (
        <HandleResponse
          isError={isError_create}
          isSuccess={isSuccess_create}
          error={error_create?.data?.err}
          message={data_create?.msg}
          onSuccess={() => {
            back()
          }}
        />
      )}

      <ConfirmUpdateModal
        title='بنر'
        updateFunc={updateBanner}
        isLoading={isLoading_update}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        updateInfo={updateInfo}
        setUpdateInfo={setUpdateInfo}
      />

      {/* Handle Update Response */}
      {(isSuccess_update || isError_update) && (
        <HandleResponse
          isError={isError_update}
          isSuccess={isSuccess_update}
          error={error_update?.data?.err}
          message={data_update?.msg}
          onSuccess={() => {
            setUpdateInfo({ id: '', editedData: {} })
            confirmUpdateModalHandlers.close()
            back()
          }}
          onError={() => {
            setUpdateInfo({ id: '', editedData: {} })
            confirmUpdateModalHandlers.close()
          }}
        />
      )}

      <ConfirmDeleteModal
        deleteFunc={deleteBanner}
        title='بنر'
        isLoading={isLoading_delete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        deleteInfo={deleteInfo}
        setDeleteInfo={setDeleteInfo}
      />

      {/* Handle Delete Response */}
      {(isSuccess_delete || isError_delete) && (
        <HandleResponse
          isError={isError_delete}
          isSuccess={isSuccess_delete}
          error={error_delete?.data?.err}
          message={data_delete?.msg}
          onSuccess={() => {
            reset({
              banners: [],
              banner: defaultValues.banner,
            })
            confirmDeleteModalHandlers.close()
            back()
          }}
          onError={() => {
            confirmDeleteModalHandlers.close()
            setDeleteInfo({ id: '' })
          }}
        />
      )}

      <main>
        <Head>
          <title>مدیریت | بنر</title>
        </Head>

        <DashboardLayout>
          {isLoading_get ? (
            <div className='px-3 py-20'>
              <BigLoading />
            </div>
          ) : (
            <PageContainer
              title={
                mode === 'create' ? 'ساخت بنر جدید' : `ویرایش بنر ${bannerName}`
              }
            >
              <section className='p-3 mx-auto mb-10 space-y-8'>
                <div className='mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10'>
                  <form
                    onSubmit={handleSubmit(submitHander)}
                    className='space-y-3'
                  >
                    <TextField
                      label='عنوان بنر'
                      control={control}
                      name='title'
                      errors={formErrors?.title}
                    />

                    <TextField
                      label='آدرس لینک'
                      direction='ltr'
                      control={control}
                      name='uri'
                    />

                    <div className='w-44 my-3'>
                      <ControlledCheckbox
                        name='public'
                        control={control}
                        label='وضعیت انتشار'
                      />
                    </div>

                    <RadioButtons name='type' />

                    <TextField
                      label='آدرس تصویر'
                      direction='ltr'
                      control={control}
                      name='image.url'
                      errors={formErrors?.image?.url}
                    />

                    <UploadImage
                      folder='/banners'
                      handleAddUploadedImageUrl={handleAddUploadedImageUrl}
                    />

                    {getValues('image.url') && (
                      <div className='mx-auto max-w-max'>
                        <Image
                          src={getValues('image.url')}
                          width={getValues('type') === 'one' ? 400 : 300}
                          height={200}
                          alt='banner image'
                        />
                      </div>
                    )}

                    <div className='flex justify-evenly gap-x-4 pt-10'>
                      {data_get ? (
                        <>
                          <Button
                            className='bg-amber-500 '
                            rounded
                            onClick={updateHandler}
                            isLoading={isLoading_update}
                          >
                            بروزرسانی بنر
                          </Button>

                          <Button
                            className='rounded-3xl'
                            isLoading={isLoading_delete}
                            onClick={deleteHandler}
                          >
                            حذف بنر
                          </Button>
                        </>
                      ) : (
                        <Button
                          className='bg-green-500 '
                          rounded
                          type='submit'
                          isLoading={isLoading_create}
                        >
                          ثبت بنر
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </section>
            </PageContainer>
          )}
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Banner), { ssr: false })
