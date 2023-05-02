import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from 'services'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { categorySchema } from 'utils'

import {
  TextField,
  PageContainer,
  Button,
  HandleResponse,
  ConfirmUpdateModal,
  BigLoading,
  DashboardLayout,
  UploadImage,
} from 'components'

import { useDisclosure } from 'hooks'

function CreateCategory() {
  //? Assets
  const { query, push } = useRouter()

  //? Modals
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? States
  const [updateInfo, setUpdateInfo] = useState({
    id: '',
    editedData: {},
  })

  //? Queries
  //*   Get Categories
  const { isLoading, selectedCategory, parentCategory } = useGetCategoriesQuery(
    undefined,
    {
      selectFromResult: ({ data, isLoading }) => ({
        selectedCategory: data?.categories.find(
          (category) => category._id === query.id
        ),
        parentCategory: data?.categories.find(
          (category) => category._id === query.parent_id
        ),
        isLoading,
      }),
    }
  )

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
    setValue,
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
    if (selectedCategory) {
      const { image, name, slug, colors } = selectedCategory
      reset({ image, name, slug, colors })
    }
  }, [selectedCategory])

  //? Handlers
  const submitHander = ({ name, slug, image, colors }) => {
    createCtegory({
      body: {
        name,
        parent: query?.parent_id || '',
        slug: slug.trim().split(' ').join('-'),
        image,
        colors,
        level: parentCategory ? parentCategory?.level + 1 : 0,
      },
    })
  }

  const updateHandler = () => {
    setUpdateInfo({
      ...updateInfo,
      id: query.id,
      editedData: {
        ...selectedCategory,
        ...watch(),
      },
    })
    confirmUpdateModalHandlers.open()
  }
  const handleAddUploadedImageUrl = (url) => setValue('image', url)

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
            push(
              `/admin/categories${
                query.parent_id ? `?parent_id=${query.parent_id}` : ''
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
            push(
              `/admin/categories${
                query.parent_id ? `?parent_id=${query.parent_id}` : ''
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

        <DashboardLayout>
          <PageContainer
            title={
              query?.params?.[0] === 'create'
                ? 'دسته بندی جدید'
                : 'ویرایش دسته بندی'
            }
          >
            {isLoading ? (
              <div className='px-3 py-20'>
                <BigLoading />
              </div>
            ) : (
              <section className='p-3 md:px-3 xl:px-8 2xl:px-10'>
                <form
                  className='flex flex-col justify-between flex-1 overflow-y-auto gap-y-5'
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

                  <UploadImage
                    folder='/icons'
                    handleAddUploadedImageUrl={handleAddUploadedImageUrl}
                  />
                  
                  {getValues('image') && (
                    <Image
                      src={getValues('image')}
                      width={200}
                      height={200}
                      className='mx-auto'
                      alt='category image'
                    />
                  )}

                  {(selectedCategory?.level <= 1 ||
                    parentCategory?.level === 0) && (
                    <div className='flex justify-evenly'>
                      <div className='flex flex-col space-y-3'>
                        <label
                          className='text-field__label'
                          htmlFor='colors.start'
                        >
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
                        <label
                          className='text-field__label'
                          htmlFor='colors.end'
                        >
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
                    {query?.params?.[0] === 'edit' && query.id ? (
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
            )}
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(CreateCategory), { ssr: false })
