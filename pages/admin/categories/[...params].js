import Image from 'next/image'
import Head from 'next/head'

import {
  useCreateCategoryMutation,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from 'services'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { categorySchema } from 'utils/validation'

import {
  TextField,
  PageContainer,
  Button,
  HandleResponse,
  ConfirmUpdateModal,
  BigLoading,
} from 'components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useDisclosure from 'hooks/useDisclosure'
import useCategory from 'hooks/useCategory'

export default function CreateCategory() {
  //? Assets
  const router = useRouter()

  //? Modals
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? States
  const [isEdit, setIsEdit] = useState(false)
  const [updateInfo, setUpdateInfo] = useState({
    id: '',
    editedData: {},
  })

  const { selectedCategory } = useCategory({
    catID: router.query.id || router.query.parent_id,
  })

  //? Queries
  //*   Create Category
  const [
    createCtegory,
    {
      data: data_create,
      isSuccess: isSuccess_create,
      isLoading: isLoading_create,
      error: error_create,
      isError: isError_create,
    },
  ] = useCreateCategoryMutation()

  //*   Get Category
  const { data: data_get, isLoading: isLoading_get } =
    useGetSingleCategoryQuery(
      {
        id: router.query.id,
      },
      { skip: !isEdit }
    )

  //*   Update Category
  const [
    updateCategory,
    {
      data: data_update,
      isSuccess: isSuccess_update,
      isError: isError_update,
      error: error_update,
      isLoading: isLoading_update,
    },
  ] = useUpdateCategoryMutation()

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    register,
    watch,
    getValues,
  } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: {
      name: '',
      slug: '',
      image: '',
      colors: { start: '#000000', end: '#000000' },
    },
  })

  //? Re-Renders
  //*   Set Category Details on Edit Mode
  useEffect(() => {
    if (data_get) {
      const { image, name, slug, colors } = data_get
      reset({ image, name, slug, colors })
    }
  }, [data_get])

  //*   Execute Get Category Query
  useEffect(() => {
    if (router.query.params[0] === 'edit' && router.query.id) {
      setIsEdit(true)
    }
  }, [])

  //? Handlers
  const submitHander = ({ name, slug, image, colors }) => {
    createCtegory({
      body: {
        name,
        parent: router.query?.parent_id || '',
        slug: slug.trim().split(' ').join('-'),
        image,
        colors,
        level: selectedCategory.level ? selectedCategory.level + 1 : 1,
      },
    })
  }

  const updateHandler = (async) => {
    setUpdateInfo({
      ...updateInfo,
      id: router.query.id,
      editedData: {
        ...data_get,
        ...watch(),
      },
    })
    confirmUpdateModalHandlers.open()
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
      {/* Handle Create Category Response */}
      {(isSuccess_create || isError_create) && (
        <HandleResponse
          isError={isError_create}
          isSuccess={isSuccess_create}
          error={error_create?.data?.err}
          message={data_create?.msg}
          onSuccess={() => {
            reset()
            router.push(
              `/admin/categories${
                router.query.parent_id
                  ? `?parent_id=${router.query.parent_id}`
                  : ''
              }`
            )
          }}
        />
      )}

      {/* Handle Update Category Response */}
      {(isSuccess_update || isError_update) && (
        <HandleResponse
          isError={isError_update}
          isSuccess={isSuccess_update}
          error={error_update?.data?.err}
          message={data_update?.msg}
          onSuccess={() => {
            setUpdateInfo({ id: '', editedData: {} })
            confirmUpdateModalHandlers.close()
            router.push(
              `/admin/categories${
                router.query.parent_id
                  ? `?parent_id=${router.query.parent_id}`
                  : ''
              }`
            )
          }}
          onError={() => {
            setUpdateInfo({ id: '', editedData: {} })
            confirmUpdateModalHandlers.close()
          }}
        />
      )}

      <ConfirmUpdateModal
        title='دسته بندی'
        updateFunc={updateCategory}
        isLoading={isLoading_update}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        updateInfo={updateInfo}
        setUpdateInfo={setUpdateInfo}
      />

      <main>
        <Head>
          <title>مدیریت | دسته بندی جدید</title>
        </Head>

        <PageContainer
          title={
            router.query.params[0] === 'create'
              ? 'دسته بندی جدید'
              : 'ویرایش دسته بندی'
          }
        >
          <section className='p-3 md:px-3 xl:px-8 2xl:px-10'>
            <form
              className='flex flex-col justify-between flex-1 pl-4 overflow-y-auto gap-y-5'
              onSubmit={handleSubmit(submitHander)}
            >
              <TextField
                label='نام دسته‌بندی'
                control={control}
                errors={formErrors.name}
                name='name'
              />

              <TextField
                label='مسیر (با حروف انگلیسی)'
                control={control}
                errors={formErrors.slug}
                name='slug'
                direction='ltr'
              />

              <TextField
                label='آدرس تصویر'
                control={control}
                errors={formErrors.image}
                name='image'
                direction='ltr'
              />
              {getValues('image') && (
                  <Image
                    src={getValues('image')}
                    width={200}
                    height={200}
                    className='mx-auto'
                    alt='category image'
                    placeholder='blur'
                    blurDataURL='/placeholder.png'
                  />
              )}

              {selectedCategory.level < 2 && (
                <div className='flex justify-evenly'>
                  <div className='flex flex-col space-y-3'>
                    <label className='text-field__label' htmlFor='colors.start'>
                      رنگ اول
                    </label>
                    <input
                      className='w-40 h-10'
                      id='colors.start'
                      type='color'
                      {...register('colors.start')}
                    />
                  </div>

                  <div className='flex flex-col space-y-3'>
                    <label className='text-field__label' htmlFor='colors.end'>
                      رنگ دوم
                    </label>
                    <input
                      className='w-40 h-10'
                      id='colors.end'
                      type='color'
                      {...register('colors.end')}
                    />
                  </div>
                </div>
              )}

              <div className='py-3 lg:pb-0 '>
                {router.query.params[0] === 'edit' && router.query.id ? (
                  <Button
                    className='mx-auto bg-amber-500'
                    rounded
                    onClick={updateHandler}
                    isLoading={isLoading_update}
                  >
                    بروزرسانی اطلاعات
                  </Button>
                ) : (
                  <Button
                    type='submit'
                    className='mx-auto !bg-green-500 '
                    isLoading={isLoading_create}
                    rounded
                  >
                    ثبت اطلاعات
                  </Button>
                )}
              </div>
            </form>
          </section>
        </PageContainer>
      </main>
    </>
  )
}

CreateCategory.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>
}
