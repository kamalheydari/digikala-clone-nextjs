import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'

import {
  useCreateDetailsMutation,
  useDeleteDetailsMutation,
  useGetDetailsQuery,
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
import { Tab } from '@headlessui/react'

import { useDisclosure } from 'hooks'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { detailsSchema } from 'utils'

import type { IDetails, IDetailsForm } from 'types'
import type { NextPage } from 'next'

const tabListNames = [
  { id: 0, name: 'optionsType', title: 'نوع انتخاب' },
  { id: 1, name: 'info', title: 'ویژگی‌ها' },
  { id: 2, name: 'specification', title: 'مشخصات' },
]

const DetailsPage: NextPage = () => {
  //? Assets
  const { query, back } = useRouter()

  const categoryId = query.id as string
  const categoryName = query.category_name as string

  const initialUpdataInfo = {} as IDetails

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? States
  const [updateInfo, setUpdateInfo] = useState<IDetails>(initialUpdataInfo)

  const [mode, setMode] = useState<'edit' | 'create'>('create')

  //? Queries
  //*   Get Details
  const { data: details, isLoading: isLoadingGet } = useGetDetailsQuery({
    id: categoryId,
  })

  //*   Update Details
  const [
    updateDetails,
    {
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateDetailsMutation()

  //*   Create Details
  const [
    createDetails,
    {
      data: dataCreate,
      isSuccess: isSuccessCreate,
      isError: isErrorCreate,
      isLoading: isLoadingCreate,
      error: errorCreate,
    },
  ] = useCreateDetailsMutation()

  //*   Delete Details
  const [
    deleteDetails,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteDetailsMutation()

  //? Hook Form
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors: formError },
  } = useForm<IDetailsForm>({
    resolver: yupResolver(detailsSchema),
    defaultValues: {
      optionsType: 'none',
      info: [],
      specification: [],
    },
  })

  //? Re-Renders
  useEffect(() => {
    if (details) {
      setMode('edit')
      reset({
        optionsType: details.optionsType,
        info: details.info,
        specification: details.specification,
      })
    }
  }, [details])

  //? Handlers
  //*   Create
  const createHandler: SubmitHandler<IDetailsForm> = async ({
    info,
    specification,
    optionsType,
  }) => {
    await createDetails({
      body: {
        category_id: categoryId,
        info,
        specification,
        optionsType,
      },
    })
  }

  //*   Update
  const updateHandler: SubmitHandler<IDetailsForm> = ({
    info,
    specification,
    optionsType,
  }) => {
    setUpdateInfo((prev) => ({
      ...prev,
      ...details,
      info,
      specification,
      optionsType,
    }))

    confirmUpdateModalHandlers.open()
  }

  const onConfirmUpdate = () => {
    updateDetails({
      id: details?._id as string,
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
  }

  const onErrorUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  //*   Delete
  const deleteHandler = () => confirmDeleteModalHandlers.open()

  const onConfirmDelete = () => deleteDetails({ id: details?._id as string })

  const onCancelDelete = () => confirmDeleteModalHandlers.close()

  const onSuccessDelete = () => {
    confirmDeleteModalHandlers.close()
    reset({
      optionsType: 'none',
      info: [],
      specification: [],
    })
    back()
  }

  const onErrorDelete = () => confirmDeleteModalHandlers.close()

  //? Render(s)
  return (
    <>
      <ConfirmDeleteModal
        title='مشخصات و ویژگی ها'
        isLoading={isLoadingDelete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />

      {/* Handle Delete Response */}
      {(isSuccessDelete || isErrorDelete) && (
        <HandleResponse
          isError={isErrorDelete}
          isSuccess={isSuccessDelete}
          error={errorDelete}
          message={dataDelete?.msg}
          onSuccess={onSuccessDelete}
          onError={onErrorDelete}
        />
      )}

      <ConfirmUpdateModal
        title='مشخصات و ویژگی های'
        isLoading={isLoadingUpdate}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        onCancel={onCancelUpdate}
        onConfirm={onConfirmUpdate}
      />

      {/* Handle Update Response */}
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

      {/* Handle Create Details Response  */}
      {(isSuccessCreate || isErrorCreate) && (
        <HandleResponse
          isError={isErrorCreate}
          isSuccess={isSuccessCreate}
          error={errorCreate}
          message={dataCreate?.msg}
        />
      )}

      <main>
        <Head>
          <title>مدیریت | مشخصات</title>
        </Head>

        <DashboardLayout>
          {isLoadingGet ? (
            <div className='px-3 py-20'>
              <BigLoading />
            </div>
          ) : (
            <PageContainer
              title={` مشخصات و ویژگی‌های دسته‌بندی ${
                categoryName ? categoryName : ''
              }`}
            >
              <form
                onSubmit={
                  mode === 'create'
                    ? handleSubmit(createHandler)
                    : handleSubmit(updateHandler)
                }
                className='p-3 space-y-6'
              >
                <Tab.Group>
                  <Tab.List className='flex space-x-1 rounded-xl bg-slate-200 p-1'>
                    {tabListNames.map((item) => (
                      <Tab
                        key={item.id}
                        className={({ selected }) =>
                          `tab
                          ${
                            formError.hasOwnProperty(item.name) &&
                            'bg-red-300 hover:bg-red-300 text-red-600 '
                          }
                         ${
                           selected
                             ? 'bg-white shadow '
                             : 'hover:text-blue-600 '
                         }
                         
                        `
                        }
                      >
                        {item.title}
                      </Tab>
                    ))}
                  </Tab.List>

                  <Tab.Panels>
                    <Tab.Panel>
                      <div className='space-y-3'>
                        <p className='mb-2'>نوع انتخاب :</p>
                        <div className='flex items-center gap-x-1'>
                          <input
                            type='radio'
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
                            id='sizes'
                            value='sizes'
                            className='ml-1'
                            {...register('optionsType')}
                          />
                          <label htmlFor='sizes'>بر اساس سایز</label>
                        </div>
                      </div>
                    </Tab.Panel>

                    <Tab.Panel>
                      <DetailsList
                        name='info'
                        control={control}
                        register={register}
                        categoryName={categoryName}
                        errors={formError.info}
                      />
                    </Tab.Panel>
                    <Tab.Panel>
                      <DetailsList
                        name='specification'
                        control={control}
                        register={register}
                        categoryName={categoryName}
                        errors={formError.specification}
                      />
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                <div className='flex justify-center gap-x-4'>
                  {mode === 'edit' ? (
                    <>
                      <Button
                        className='bg-amber-500 '
                        isRounded={true}
                        type='submit'
                        isLoading={isLoadingUpdate}
                      >
                        بروزرسانی مشخصات و ویژگی ها
                      </Button>

                      <Button
                        className='rounded-3xl'
                        isLoading={isLoadingDelete}
                        onClick={deleteHandler}
                      >
                        حذف مشخصات و ویژگی ها
                      </Button>
                    </>
                  ) : (
                    <Button
                      className='bg-green-500 '
                      isRounded={true}
                      type='submit'
                      isLoading={isLoadingCreate}
                    >
                      ثبت مشخصات و ویژگی ها
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
