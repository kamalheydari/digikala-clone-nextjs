import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import { showAlert } from 'store'

import {
  useCreateDetailsMutation,
  useDeleteDetailsMutation,
  useGetDetailsQuery,
  useGetSingleCategoryQuery,
  useUpdateDetailsMutation,
} from 'services'

import {
  BigLoading,
  Button,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  DashboardLayout,
  DetailsList,
  HandleResponse,
  PageContainer,
} from 'components'

import { useDisclosure } from 'hooks'

import { useForm } from 'react-hook-form'

function DetailsPage() {
  //? Assets
  const router = useRouter()
  const dispatch = useDispatch()

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

  //? Queries
  //*   Get Category
  const { data: category } = useGetSingleCategoryQuery({
    id: router.query.id,
  })

  //*   Get Details
  const { data: details, isLoading: isLoading_get } = useGetDetailsQuery({
    id: router.query.id,
  })

  //*   Update Details
  const [
    updateDetails,
    {
      data: data_update,
      isSuccess: isSuccess_update,
      isError: isError_update,
      error: error_update,
      isLoading: isLoading_update,
    },
  ] = useUpdateDetailsMutation()
  //*   Create Details
  const [
    createDetails,
    {
      data: data_create,
      isSuccess: isSuccess_create,
      isError: isError_create,
      isLoading: isLoading_create,
      error: error_create,
    },
  ] = useCreateDetailsMutation()

  //*   Delete Details
  const [
    deleteDetails,
    {
      isSuccess: isSuccess_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
      isLoading: isLoading_delete,
    },
  ] = useDeleteDetailsMutation()

  //? Hook Form
  const { handleSubmit, register, reset, control, getValues } = useForm({
    defaultValues: {
      optionsType: 'none',
      info: [],
      specification: [],
    },
  })

  //? Re-Renders
  useEffect(() => {
    if (details)
      reset({
        optionsType: details.optionsType,
        info: details.info,
        specification: details.specification,
      })
  }, [details])

  //? Handlers
  const deleteHandler = () => {
    setDeleteInfo({ ...deleteInfo, id: details?._id })
    confirmDeleteModalHandlers.open()
  }

  const submitHander = async ({ info, specification, optionsType }) => {
    if (info.length !== 0 && specification.length !== 0) {
      await createDetails({
        body: {
          category_id: category._id,
          name: category.slug,
          info,
          specification,
          optionsType,
        },
      })
    } else {
      dispatch(
        showAlert({
          status: 'error',
          title: 'لطفا مشخصات و ویژگی ها را وارد کنید',
        })
      )
    }
  }

  const updateHandler = () => {
    setUpdateInfo({
      ...updateInfo,
      id: details?._id,
      editedData: {
        category_id: category?._id,
        info: getValues('info'),
        specification: getValues('specification'),
        optionsType: getValues('optionsType'),
      },
    })

    confirmUpdateModalHandlers.open()
  }

  //? Render(s)
  return (
    <>
      <ConfirmDeleteModal
        deleteFunc={deleteDetails}
        title='مشخصات و ویژگی ها'
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
              optionsType: 'none',
              info: [],
              specification: [],
            })
            confirmDeleteModalHandlers.close()
          }}
          onError={() => {
            confirmDeleteModalHandlers.close()
            setDeleteInfo({ id: '' })
          }}
        />
      )}

      <ConfirmUpdateModal
        title='مشخصات و ویژگی های'
        updateFunc={updateDetails}
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

      {/* Handle Create Details Response  */}
      {(isSuccess_create || isError_create) && (
        <HandleResponse
          isError={isError_create}
          isSuccess={isSuccess_create}
          error={error_create?.data?.err}
          message={data_create?.msg}
        />
      )}
      <main>
        <Head>
          <title>مدیریت | مشخصات</title>
        </Head>

        <DashboardLayout>
          {isLoading_get ? (
            <div className='px-3 py-20'>
              <BigLoading />
            </div>
          ) : (
            <PageContainer
              title={` مشخصات و ویژگی‌های دسته‌بندی ${
                category?.name ? category?.name : ''
              }`}
            >
              <form
                onSubmit={handleSubmit(submitHander)}
                className='p-3 space-y-6'
              >
                <div className='space-y-3'>
                  <p className='mb-2'>نوع انتخاب :</p>
                  <div className='flex items-center gap-x-1'>
                    <input
                      type='radio'
                      name='optionsType'
                      id='none'
                      value='none'
                      className='ml-1'
                      {...register('optionsType')}
                    />
                    <label htmlFor='none'>بدون حق انتخاب</label>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <input
                      type='radio'
                      name='optionsType'
                      id='colors'
                      value='colors'
                      className='ml-1'
                      {...register('optionsType')}
                    />
                    <label htmlFor='colors'>بر اساس رنگ</label>
                  </div>
                  <div className='flex items-center gap-x-1'>
                    <input
                      type='radio'
                      name='optionsType'
                      id='sizes'
                      value='sizes'
                      className='ml-1'
                      {...register('optionsType')}
                    />
                    <label htmlFor='sizes'>بر اساس سایز</label>
                  </div>
                </div>
                <DetailsList
                  name='info'
                  control={control}
                  register={register}
                  category={category}
                />
                <DetailsList
                  name='specification'
                  control={control}
                  register={register}
                  category={category}
                />
                <div className='flex justify-center gap-x-4'>
                  {details ? (
                    <>
                      <Button
                        className='bg-amber-500 rounded-3xl'
                        onClick={updateHandler}
                        isLoading={isLoading_update}
                      >
                        بروزرسانی اطلاعات
                      </Button>

                      <Button
                        className='rounded-3xl'
                        isLoading={isLoading_delete}
                        onClick={deleteHandler}
                      >
                        حذف اطلاعات
                      </Button>
                    </>
                  ) : (
                    <Button
                      className='bg-green-500 '
                      rounded
                      type='submit'
                      isLoading={isLoading_create}
                    >
                      ثبت اطلاعات
                    </Button>
                  )}
                </div>
              </form>
            </PageContainer>
          )}
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(DetailsPage), { ssr: false })
