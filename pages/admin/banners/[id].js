import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { showAlert } from 'store'
import { useDispatch } from 'react-redux'

import {
  AddToListIconBtn,
  BigLoading,
  Button,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  ControlledCheckbox,
  DashboardLayout,
  DeleteFromListIconBtn,
  HandleResponse,
  Icons,
  PageContainer,
  TextField,
  UploadImage,
} from 'components'

import { Disclosure } from '@headlessui/react'

import { useDisclosure } from 'hooks'

import { useFieldArray, useForm } from 'react-hook-form'

import {
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} from 'services'

function Banner() {
  //? Assets
  const router = useRouter()
  const dispatch = useDispatch()
  const defaultValues = {
    banners: [],
    newBanner: {
      image: { url: '' },
      title: '',
      uri: '',
      public: true,
      type: 'one',
    },
  }

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
  const { control, getValues, reset, register, setValue } = useForm({
    defaultValues,
  })

  const { fields, remove, prepend } = useFieldArray({
    name: 'banners',
    control,
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
  const { data: data_get, isLoading: isLoading_get } = useGetSingleBannerQuery({
    id: router.query.id,
  })

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
        banners: data_get.banners,
        newBanner: defaultValues.newBanner,
      })
  }, [data_get])

  //? Handlers
  const submitHander = () => {
    const banners = getValues('banners')
    if (banners.length === 0)
      dispatch(
        showAlert({
          status: 'error',
          title: 'بنرها را وارد کنید',
        })
      )
    else {
      createBanner({
        body: { category_id: router.query.id, banners },
      })
    }
  }

  const addBannerHandler = () => {
    if (
      getValues('newBanner.title') === '' ||
      getValues('newBanner.image.url') === ''
    ) {
      dispatch(
        showAlert({
          status: 'error',
          title: 'عنوان و آدرس تصویر را وارد کنید',
        })
      )
    } else {
      prepend({
        image: { url: getValues('newBanner.image.url') },
        title: getValues('newBanner.title'),
        uri: getValues('newBanner.uri'),
        public: getValues('newBanner.public'),
        type: getValues('newBanner.type'),
      })
      reset({
        banners: getValues('banners'),
        newBanner: defaultValues.newBanner,
      })
    }
  }

  const updateHandler = () => {
    setUpdateInfo({
      ...updateInfo,
      id: data_get?._id,
      editedData: {
        banners: getValues('banners'),
      },
    })

    confirmUpdateModalHandlers.open()
  }

  const deleteHandler = () => {
    setDeleteInfo({ ...deleteInfo, id: data_get?._id })
    confirmDeleteModalHandlers.open()
  }

  const handleAddUploadedImageUrl = (url) =>
    setValue('newBanner.image.url', url)

  //? Local Components
  const RadioButtons = ({ name }) => (
    <div className='flex items-center gap-8 py-3'>
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
            router.push('/admin/banners')
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
              newBanner: defaultValues.newBanner,
            })
            confirmDeleteModalHandlers.close()
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
              title={`بنرهای دسته بندی ${router.query?.category_name}`}
            >
              <section className='p-3 mx-auto mb-10 space-y-8'>
                <div className='mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10'>
                  <form>
                    {/* new baneer form */}
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 '>
                            <span className='text-base'>افزودن بنر جدید</span>
                            <Icons.ArrowDown
                              className={`${
                                open ? 'rotate-180 transform' : ''
                              } h-5 w-5 text-purple-500`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className='px-4 pt-4 pb-2 space-y-2 text-sm text-gray-500'>
                            <TextField
                              label='عنوان بنر'
                              control={control}
                              name='newBanner.title'
                            />

                            <TextField
                              label='آدرس لینک'
                              direction='ltr'
                              control={control}
                              name='newBanner.uri'
                            />

                            <TextField
                              label='آدرس تصویر'
                              direction='ltr'
                              control={control}
                              name='newBanner.image.url'
                            />

                            <UploadImage
                              folder='/banners'
                              handleAddUploadedImageUrl={
                                handleAddUploadedImageUrl
                              }
                            />

                            <div className='max-w-fit my-3'>
                              <ControlledCheckbox
                                name='newBanner.public'
                                control={control}
                                label='وضعیت انتشار'
                              />
                            </div>

                            <RadioButtons name='newBanner.type' />

                            <AddToListIconBtn onClick={addBannerHandler} />

                            <div className='my-4 section-divide-y lg:block' />
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>

                    {/* banners */}
                    <section className='my-4 space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-2 lg:gap-y-4 '>
                      {fields.map((banner, idx) => (
                        <div
                          className='p-2 border border-gray-300 rounded-md space-y-2'
                          key={idx}
                        >
                          <div className='mx-auto max-w-max'>
                            <Image
                              src={banner.image.url}
                              width={
                                getValues(`banners.${idx}.type`) === 'one'
                                  ? 400
                                  : 300
                              }
                              height={200}
                              alt='banner image'
                            />
                          </div>

                          <TextField
                            label='عنوان بنر'
                            control={control}
                            name={`banners.${idx}.title`}
                          />

                          <TextField
                            label='آدرس لینک'
                            direction='ltr'
                            control={control}
                            name={`banners.${idx}.uri`}
                          />

                          <TextField
                            label='آدرس تصویر'
                            direction='ltr'
                            control={control}
                            name={`banners.${idx}.image.url`}
                          />

                          <UploadImage
                            folder='/banners'
                            handleAddUploadedImageUrl={(url) => {
                              setValue(`banners.${idx}.image.url`, url)
                            }}
                          />

                          {/* <Checkbox name={`banners.${idx}.public`} /> */}
                          <div className='max-w-fit my-3'>
                            <ControlledCheckbox
                              name={`banners.${idx}.public`}
                              control={control}
                              label='وضعیت انتشار'
                            />
                          </div>

                          <RadioButtons name={`banners.${idx}.type`} />

                          <DeleteFromListIconBtn onClick={() => remove(idx)} />
                        </div>
                      ))}
                    </section>
                    <div className='flex justify-evenly gap-x-4'>
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
                      ) : getValues('banners').length > 0 ? (
                        <Button
                          className='bg-green-500 '
                          rounded
                          onClick={submitHander}
                          isLoading={isLoading_create}
                        >
                          ثبت بنر
                        </Button>
                      ) : null}
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
