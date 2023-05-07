import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import {
  useCreateSliderMutation,
  useDeleteSliderMutation,
  useGetSingleSliderQuery,
  useUpdateSliderMutation,
} from 'services'

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
import { yupResolver } from '@hookform/resolvers/yup'
import { sliderSchema } from 'utils'

function Slider() {
  //? Assets
  const { query, back } = useRouter()
  const defaultValues = {
    image: { url: '' },
    title: '',
    uri: '',
    public: true,
  }

  const mode = query?.params?.[0]
  const categoryName = query?.category_name
  const categoryId = query?.category_id
  const sliderId = query?.slider_id
  const sliderName = query?.slider_name

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
    setValue,
    handleSubmit,
    trigger,
    formState: { errors: formErrors },
    watch,
  } = useForm({
    defaultValues,
    resolver: yupResolver(sliderSchema),
  })

  //? Queries
  //*     Create Slider
  const [
    createSlider,
    {
      data: data_create,
      isSuccess: isSuccess_create,
      isLoading: isLoading_create,
      error: error_create,
      isError: isError_create,
    },
  ] = useCreateSliderMutation()

  //*   Get Slider
  const { data: data_get, isLoading: isLoading_get } = useGetSingleSliderQuery(
    {
      id: sliderId,
    },
    { skip: !sliderId }
  )

  //*   Update Slider
  const [
    updateSlider,
    {
      data: data_update,
      isSuccess: isSuccess_update,
      isError: isError_update,
      error: error_update,
      isLoading: isLoading_update,
    },
  ] = useUpdateSliderMutation()

  //*   Delete Slider
  const [
    deleteSlider,
    {
      isSuccess: isSuccess_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
      isLoading: isLoading_delete,
    },
  ] = useDeleteSliderMutation()

  //? Re-Renders
  useEffect(() => {
    if (data_get)
      reset({
        ...data_get,
      })
  }, [data_get])

  //? Handlers
  const submitHander = (slider) => {
    createSlider({
      body: { category_id: categoryId, ...slider },
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
        title='اسلایدر'
        updateFunc={updateSlider}
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
        deleteFunc={deleteSlider}
        title='اسلایدر'
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
            reset(defaultValues)
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
          <title>مدیریت | اسلایدر</title>
        </Head>

        <DashboardLayout>
          {isLoading_get ? (
            <div className='px-3 py-20'>
              <BigLoading />
            </div>
          ) : (
            <PageContainer
              title={
                mode === 'create'
                  ? 'ساخت اسلایدر جدید'
                  : `ویرایش اسلایدر ${sliderName}`
              }
            >
              <section className='p-3 mx-auto mb-10 space-y-8'>
                <div className='mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10'>
                  <form onSubmit={handleSubmit(submitHander)}>
                    <TextField
                      label='عنوان اسلایدر'
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

                    <TextField
                      label='آدرس تصویر'
                      direction='ltr'
                      control={control}
                      name='image.url'
                      errors={formErrors?.image?.url}
                    />

                    <UploadImage
                      folder='/sliders'
                      handleAddUploadedImageUrl={handleAddUploadedImageUrl}
                    />

                    <div className='w-44 my-3'>
                      <ControlledCheckbox
                        name='public'
                        control={control}
                        label='وضعیت انتشار'
                      />
                    </div>

                    {getValues('image.url') && (
                      <div className='mx-auto max-w-max'>
                        <Image
                          src={getValues('image.url')}
                          width={1000}
                          height={230}
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
                            بروزرسانی اسلایدر
                          </Button>

                          <Button
                            className='rounded-3xl'
                            isLoading={isLoading_delete}
                            onClick={deleteHandler}
                          >
                            حذف اسلایدر
                          </Button>
                        </>
                      ) : (
                        <Button
                          className='bg-green-500 '
                          rounded
                          type='submit'
                          isLoading={isLoading_create}
                        >
                          ثبت اسلایدر
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

export default dynamic(() => Promise.resolve(Slider), { ssr: false })
