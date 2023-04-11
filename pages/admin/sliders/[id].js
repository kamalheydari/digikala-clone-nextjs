import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import {
  useCreateSliderMutation,
  useDeleteSliderMutation,
  useGetSingleCategoryQuery,
  useGetSingleSliderQuery,
  useUpdateSliderMutation,
} from 'services'

import { showAlert } from 'store'
import { useDispatch } from 'react-redux'

import {
  AddToListIconBtn,
  BigLoading,
  Button,
  Checkbox,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  DeleteFromListIconBtn,
  HandleResponse,
  Icons,
  PageContainer,
  TextField,
} from 'components'
import { Disclosure } from '@headlessui/react'

import { useDisclosure } from 'hooks'

import { useFieldArray, useForm } from 'react-hook-form'

export default function Slider() {
  //? Assets
  const router = useRouter()
  const dispatch = useDispatch()
  const defaultValues = {
    sliders: [],
    newSlider: { image: { url: '' }, title: '', uri: '', public: true },
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

  //? Get Category
  const { data: selectedCategory } = useGetSingleCategoryQuery({
    id: router.query.id,
  })

  //? Hook Form
  const { control, getValues, reset } = useForm({
    defaultValues,
  })

  const { fields, remove, prepend } = useFieldArray({
    name: 'sliders',
    control,
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
  const { data: data_get, isLoading: isLoading_get } = useGetSingleSliderQuery({
    id: router.query.id,
  })

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
        sliders: data_get.sliders,
        newSlider: defaultValues.newSlider,
      })
  }, [data_get])

  //? Handlers
  const submitHander = () => {
    const sliders = getValues('sliders')
    if (sliders.length === 0)
      dispatch(
        showAlert({
          status: 'error',
          title: 'اسلایدها را وارد کنید',
        })
      )
    else {
      createSlider({
        body: { category_id: selectedCategory._id, sliders },
      })
    }
  }

  const addSliderHandler = () => {
    if (
      getValues('newSlider.title') === '' ||
      getValues('newSlider.image.url') === ''
    ) {
      dispatch(
        showAlert({
          status: 'error',
          title: 'عنوان و آدرس تصویر را وارد کنید',
        })
      )
    } else {
      prepend({
        image: { url: getValues('newSlider.image.url') },
        title: getValues('newSlider.title'),
        uri: getValues('newSlider.uri'),
        public: getValues('newSlider.public'),
      })
      reset({
        sliders: getValues('sliders'),
        newSlider: defaultValues.newSlider,
      })
    }
  }

  const updateHandler = () => {
    setUpdateInfo({
      ...updateInfo,
      id: data_get?._id,
      editedData: {
        sliders: getValues('sliders'),
      },
    })

    confirmUpdateModalHandlers.open()
  }

  const deleteHandler = () => {
    setDeleteInfo({ ...deleteInfo, id: data_get?._id })
    confirmDeleteModalHandlers.open()
  }

  //? Render(s)
  if (isLoading_get)
    return (
      <div className='px-3 py-20'>
        <BigLoading />
      </div>
    )

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
            router.push('/admin/sliders')
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
            reset({
              sliders: [],
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
          <title>مدیریت | اسلایدر</title>
        </Head>

        <PageContainer title={`اسلایدر دسته بندی ${selectedCategory?.name}`}>
          <section className='p-3 mx-auto mb-10 space-y-8'>
            <div className='mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10'>
              <form>
                {/* new slider form */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 '>
                        <span className='text-base'>افزودن اسلایدر جدید</span>
                        <Icons.ArrowDown
                          className={`${
                            open ? 'rotate-180 transform' : ''
                          } h-5 w-5 text-purple-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-gray-500'>
                        <TextField
                          label='عنوان اسلایدر'
                          control={control}
                          name='newSlider.title'
                        />
                        <TextField
                          label='آدرس تصویر'
                          direction='ltr'
                          control={control}
                          name='newSlider.image.url'
                        />

                        <TextField
                          label='آدرس لینک'
                          direction='ltr'
                          control={control}
                          name='newSlider.uri'
                        />

                        <Checkbox
                          name='newSlider.public'
                          control={control}
                          label='منتشر شده'
                        />

                        <AddToListIconBtn onClick={addSliderHandler} />

                        <div className='my-4 section-divide-y lg:block' />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* sliders */}
                <section className='my-4 space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-2 lg:gap-y-4 '>
                  {fields.map((slider, idx) => (
                    <div
                      className='p-2 border border-gray-300 rounded-md'
                      key={idx}
                    >
                      <Image
                        src={slider.image.url}
                        width={1000}
                        height={230}
                        alt='slider image'
                      />

                      <TextField
                        label='عنوان اسلایدر'
                        control={control}
                        name={`sliders.${idx}.title`}
                      />

                      <TextField
                        label='آدرس تصویر'
                        direction='ltr'
                        control={control}
                        name={`sliders.${idx}.image.url`}
                      />

                      <TextField
                        label='آدرس لینک'
                        direction='ltr'
                        control={control}
                        name={`sliders.${idx}.uri`}
                      />

                      <Checkbox
                        name={`sliders.${idx}.public`}
                        control={control}
                        label='منتشر شده'
                      />

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
                  ) : getValues('sliders').length > 0 ? (
                    <Button
                      className='bg-green-500 '
                      rounded
                      onClick={submitHander}
                      isLoading={isLoading_create}
                    >
                      ثبت اسلایدر
                    </Button>
                  ) : null}
                </div>
              </form>
            </div>
          </section>
        </PageContainer>
      </main>
    </>
  )
}

//? Layout
Slider.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>
}
